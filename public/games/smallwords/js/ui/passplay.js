// Pass-and-play UI (design §4 pass-and-play loop, §11 interstitial).
// Reuses the write and guess screens with its own wiring; the handoff
// screen sits between every role change so nobody peeks.

import { createPassPlayRound } from '../game-pass.js';
import { showScreen, setTopbar, escapeHtml, debugOverlay, advanceOnKey, disarmAdvanceKey } from './screens.js';
import { getWriteEls, bindEditor } from './write.js';
import { getGuessEls, renderGuessItem, shakeInput, setGuessFeedback } from './guess.js';

export function startPassPlay(app, rand, onEnd) {
  const round = createPassPlayRound({
    pack: app.pack,
    config: app.config,
    rand,
    wordSet: app.wordSet,
    seenIds: app.seenPass,
  });

  const wEl = getWriteEls();
  const gEl = getGuessEls();
  gEl.reveal.hidden = false; // timed mode may have hidden it
  const handoff = {
    screen: document.getElementById('screen-handoff'),
    title: document.getElementById('handoff-title'),
    text: document.getElementById('handoff-text'),
    ready: document.getElementById('btn-ready'),
  };

  const player = (i) => `Player ${i + 1}`;

  function showHandoff(title, text, onReady) {
    handoff.title.textContent = title;
    handoff.text.textContent = text;
    handoff.ready.onclick = onReady;
    showScreen('screen-handoff');
    handoff.ready.focus(); // Enter/Space activates it — no mouse needed
    if (app.flags.skip) onReady();
  }

  // ---------- write phase ----------

  const editor = bindEditor(wEl, app, {
    evaluate: (text) => round.evaluate(text),
    getPar: () => round.state.object.parLetters,
    onSubmit: () => {
      const res = round.submitWrite(wEl.input.value);
      if (!res) return;
      app.audio.play('stamp');
      const s = round.state;
      showHandoff(
        'Hand it over!',
        `Give this to ${player(s.guesserIndex)} — no peeking! ` +
        `They will read your small words and try to name the thing.`,
        beginGuess
      );
    },
    onSkip: () => {
      if (round.skipWrite()) {
        app.audio.play('giveup');
        showLegResult();
      }
    },
  });

  function beginWritePhase() {
    const s = round.state;
    showHandoff(
      `${player(s.writerIndex)} writes`,
      `${player(s.guesserIndex)}, look away! ` +
      `${player(s.writerIndex)} gets a thing and must tell about it using only small words. ` +
      `Fewer letters means a bigger star prize if it gets guessed.`,
      beginWrite
    );
  }

  function beginWrite() {
    const s = round.state;
    setTopbar(`${player(s.writerIndex)} writes`, `${s.leg + 1} / ${s.legs}`);
    wEl.object.textContent = s.object.name;
    wEl.category.textContent = s.object.category;
    wEl.input.value = '';
    editor.runCheck();
    showScreen('screen-write');
    wEl.input.focus();
    debugOverlay.update(app);
  }

  // ---------- guess phase ----------

  function renderGuess() {
    const s = round.state;
    setTopbar(`${player(s.guesserIndex)} guesses`, `${s.leg + 1} / ${s.legs}`);
    renderGuessItem(gEl, s.guess, app.config);
    debugOverlay.update(app);
  }

  function beginGuess() {
    setGuessFeedback(gEl, '');
    gEl.input.value = '';
    showScreen('screen-guess');
    renderGuess();
    gEl.input.focus();
  }

  gEl.reveal.onclick = () => {
    if (round.reveal()) {
      app.audio.play('reveal');
      setGuessFeedback(gEl, '');
      renderGuess();
    }
    gEl.input.focus();
  };

  gEl.giveup.onclick = () => {
    if (round.giveUp()) {
      app.audio.play('giveup');
      showLegResult();
    }
  };

  gEl.form.onsubmit = (e) => {
    e.preventDefault();
    const result = round.guessAnswer(gEl.input.value);
    if (result === 'empty') return;
    if (result === 'duplicate') {
      shakeInput(gEl);
      setGuessFeedback(gEl, 'You already said that.', 'bad');
      return;
    }
    if (result === 'correct') {
      app.audio.play('correct');
      showLegResult();
      return;
    }
    if (result === 'wrong') {
      app.audio.play('wrong');
      shakeInput(gEl);
      setGuessFeedback(gEl, 'That is not it.', 'bad');
      gEl.input.value = '';
      renderGuess();
      return;
    }
    if (result === 'failed') {
      app.audio.play('wrong');
      showLegResult();
    }
  };

  gEl.input.onkeydown = (e) => {
    if (e.key === '+' && gEl.input.value === '') {
      e.preventDefault();
      gEl.reveal.click();
    }
  };

  // ---------- leg result ----------

  function showLegResult() {
    const s = round.state;
    const lr = s.legResults[s.legResults.length - 1];
    gEl.answerResult.textContent =
      lr.status === 'won' ? `${player(lr.guesserIndex)} got it!`
      : lr.status === 'skipped' ? `${player(lr.writerIndex)} skipped. It was:`
      : lr.status === 'gaveup' ? 'It was:'
      : 'That is not it. It was:';
    gEl.answerResult.className = 'answer-result ' + (lr.status === 'won' ? 'good' : 'bad');
    gEl.answerName.textContent = lr.object.name;
    gEl.answerPoints.innerHTML =
      `${escapeHtml(player(lr.guesserIndex))} (guesser) +${lr.guesserPoints} · ` +
      `${escapeHtml(player(lr.writerIndex))} (writer) +${lr.writerPoints}` +
      (lr.status === 'won' && lr.stars ? ` <span class="leg-stars">${'★'.repeat(lr.stars)}</span>` : '');
    gEl.answerFull.textContent = lr.text || '(nothing written)';
    showScreen('screen-answer');

    const advance = () => {
      gEl.answerScreen.onclick = null;
      disarmAdvanceKey();
      if (round.nextLeg()) {
        beginWritePhase();
      } else {
        finish();
      }
    };
    gEl.answerScreen.onclick = advance;
    advanceOnKey(advance); // Enter / Space → next leg
    if (app.flags.skip) advance();
  }

  function finish() {
    const s = round.state;
    onEnd({
      mode: 'pass',
      scores: s.scores,
      legResults: s.legResults,
    });
  }

  // --- controller interface for main.js ---
  const controller = {
    debugInfo() {
      const s = round.state;
      return s.object ? { answer: s.object.name, aliases: s.object.aliases } : null;
    },
    cheatSolve() {
      const s = round.state;
      if (s.phase === 'write') {
        // a generic filler that passes the checker for any object
        wEl.input.value = 'it is a good thing that people use a lot every day and like very much';
        editor.runCheck();
        wEl.submit.click();
      } else if (s.phase === 'guess') {
        gEl.input.value = s.object.name;
        gEl.form.onsubmit(new Event('submit'));
      }
    },
    cheatPoints() { /* no-op */ },
  };

  beginWritePhase();
  return controller;
}
