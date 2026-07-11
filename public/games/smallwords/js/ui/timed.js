// Timed screen (design: a clock-driven variant of guess mode).
// Reuses the guess screen DOM, but the "Show more" button is hidden and a
// setInterval reveals one letter every timedTickMs while draining the meter.
// The timer must pause with the pause menu and stop on quit/restart, so this
// controller exposes setPaused() and destroy() for main.js to drive.

import { createTimedRound } from '../game-timed.js';
import { showScreen, setTopbar, escapeHtml, debugOverlay, advanceOnKey, disarmAdvanceKey } from './screens.js';
import { getGuessEls, shakeInput, setGuessFeedback } from './guess.js';

export function startTimedRound(app, rand, onEnd) {
  const round = createTimedRound({
    pack: app.pack,
    config: app.config,
    rand,
    seenIds: app.seenTimed,
  });

  const el = getGuessEls();
  el.reveal.hidden = true;            // no buying words in timed mode
  document.body.classList.add('timed-mode'); // linear draining meter (CSS)

  let timer = null;
  let advanceTimer = null;

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function startTimer() {
    stopTimer();
    timer = setInterval(onTick, app.config.timedTickMs);
  }

  function render() {
    const s = round.state;
    const it = s.item;
    setTopbar(`Score ${s.roundScore}`, `${s.index + 1} / ${s.total}`);

    el.category.textContent = it.object.category;
    el.pips.innerHTML = Array.from({ length: app.config.maxWrongGuesses }, (_, i) =>
      `<span class="pip ${i < it.wrongGuesses.length ? 'pip-filled' : ''}"></span>`
    ).join('');

    el.meterValue.textContent = it.value;
    el.meterFill.style.width = (it.value / app.config.timedStartValue) * 100 + '%';
    el.meterFill.classList.toggle('low', it.value <= 30);

    // letters drip in: revealed prefix as-is, the rest as ▁ with spaces kept
    const revealed = it.text.slice(0, it.revealedChars);
    const hidden = it.text.slice(it.revealedChars).replace(/[^\s]/g, '▁');
    el.text.innerHTML = escapeHtml(revealed) + (hidden ? `<span class="blank">${escapeHtml(hidden)}</span>` : '');

    el.wrong.innerHTML = it.wrongGuesses.length
      ? 'Not it: ' + it.wrongGuesses.map((g) => `<span class="wrong-item">${escapeHtml(g)}</span>`).join(' ')
      : '';

    debugOverlay.update(app);
  }

  function onTick() {
    const r = round.tick();
    render();
    if (r === 'timeout') {
      stopTimer();
      app.audio.play('wrong');
      showAnswerCard('lost');
    }
  }

  function showAnswerCard(kind) {
    const it = round.state.item;
    el.answerResult.textContent =
      kind === 'won' ? 'You got it!' : kind === 'gaveup' ? 'It was:' : "Time is up! It was:";
    el.answerResult.className = 'answer-result ' + (kind === 'won' ? 'good' : 'bad');
    el.answerName.textContent = it.object.name;
    el.answerPoints.textContent = kind === 'won' ? `+${it.banked} points` : '+0 points';
    el.answerFull.textContent = it.text;
    showScreen('screen-answer');

    const advance = () => {
      clearTimeout(advanceTimer);
      el.answerScreen.onclick = null;
      disarmAdvanceKey();
      if (round.next()) {
        begin();
      } else {
        finish();
      }
    };
    el.answerScreen.onclick = advance;
    advanceOnKey(advance); // Enter / Space → next puzzle
    if (app.flags.skip) advance();
    else if (kind === 'won') advanceTimer = setTimeout(advance, app.config.answerRevealMs);
    // timeouts / give-ups wait for a click / keypress so the player can read the answer
  }

  function finish() {
    const s = round.state;
    const [wizard, quick] = app.config.rankThresholds;
    onEnd({
      mode: 'timed',
      score: s.roundScore,
      rank: s.rank,
      warmth: s.roundScore >= wizard ? 2 : s.roundScore >= quick ? 1 : 0,
      results: s.results,
    });
  }

  function begin() {
    showScreen('screen-guess');
    render();
    setGuessFeedback(el, '');
    el.input.value = '';
    el.input.focus();
    startTimer();
  }

  // --- events ---

  el.giveup.onclick = () => {
    if (round.giveUp()) {
      stopTimer();
      app.audio.play('giveup');
      render();
      showAnswerCard('gaveup');
    }
  };

  el.form.onsubmit = (e) => {
    e.preventDefault();
    const result = round.guess(el.input.value);
    if (result === 'empty') return;
    if (result === 'duplicate') {
      shakeInput(el);
      setGuessFeedback(el, 'You already said that.', 'bad');
      return;
    }
    if (result === 'correct') {
      stopTimer();
      app.audio.play('correct');
      render();
      showAnswerCard('won');
      return;
    }
    if (result === 'wrong') {
      app.audio.play('wrong');
      shakeInput(el);
      setGuessFeedback(el, 'That is not it.', 'bad');
      el.input.value = '';
      render();
      return;
    }
    if (result === 'failed') {
      stopTimer();
      app.audio.play('wrong');
      render();
      showAnswerCard('lost');
    }
  };

  el.input.onkeydown = null; // the "+" reveal shortcut does not apply here

  const controller = {
    debugInfo() {
      const it = round.state.item;
      return it ? { answer: it.object.name, aliases: it.object.aliases } : null;
    },
    cheatSolve() {
      const it = round.state.item;
      if (!it || it.status !== 'playing') return;
      el.input.value = it.object.name;
      el.form.onsubmit(new Event('submit'));
    },
    cheatPoints() { /* no-op: value is time-driven in this mode */ },
    setPaused(paused) {
      if (paused) {
        stopTimer();
      } else if (round.state.item && round.state.item.status === 'playing'
                 && !document.getElementById('screen-guess').hidden) {
        startTimer();
      }
    },
    destroy() {
      stopTimer();
      clearTimeout(advanceTimer);
      disarmAdvanceKey();
      el.reveal.hidden = false;
      el.meterFill.classList.remove('low');
      document.body.classList.remove('timed-mode');
    },
  };

  begin();
  return controller;
}
