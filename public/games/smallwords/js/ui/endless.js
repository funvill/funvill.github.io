// Endless / survival screen. Reuses the guess screen; keeps dealing puzzles
// until three misses end the run.

import { createEndlessRound } from '../game-endless.js';
import { showScreen, setTopbar, debugOverlay, advanceOnKey, disarmAdvanceKey } from './screens.js';
import { getGuessEls, renderGuessItem, shakeInput, setGuessFeedback } from './guess.js';

export function startEndlessRound(app, rand, onEnd) {
  const round = createEndlessRound({
    pack: app.pack,
    config: app.config,
    rand,
    seenIds: app.seenEndless,
  });

  const el = getGuessEls();
  el.reveal.hidden = false;
  let advanceTimer = null;

  function hearts() {
    const s = round.state;
    return '♥'.repeat(s.lives) + '♡'.repeat(s.maxLives - s.lives);
  }

  function render() {
    const s = round.state;
    setTopbar(`Solved ${s.solved}`, hearts());
    renderGuessItem(el, s.item, app.config);
    debugOverlay.update(app);
  }

  function showAnswerCard(kind) {
    const s = round.state;
    const it = s.item;
    el.answerResult.textContent =
      kind === 'won' ? 'You got it!' : kind === 'gaveup' ? 'It was:' : 'That is not it. It was:';
    el.answerResult.className = 'answer-result ' + (kind === 'won' ? 'good' : 'bad');
    el.answerName.textContent = it.object.name;
    el.answerPoints.textContent = kind === 'won'
      ? `+${it.banked} points`
      : `Life lost — ${round.state.lives} left`;
    el.answerFull.textContent = it.words.join(' ');
    showScreen('screen-answer');

    const advance = () => {
      clearTimeout(advanceTimer);
      el.answerScreen.onclick = null;
      disarmAdvanceKey();
      if (round.next()) {
        showScreen('screen-guess');
        render();
        el.input.value = '';
        el.input.focus();
      } else {
        finish();
      }
    };
    el.answerScreen.onclick = advance;
    advanceOnKey(advance);
    if (app.flags.skip) advance();
    else if (kind === 'won') advanceTimer = setTimeout(advance, app.config.answerRevealMs);
    // a miss waits for a click/keypress so you can read the answer
  }

  function finish() {
    const s = round.state;
    onEnd({
      mode: 'endless',
      solved: s.solved,
      score: s.solved,        // survival brag = how many you named
      points: s.totalScore,
      results: s.results,
    });
  }

  el.reveal.onclick = () => {
    if (round.reveal()) {
      app.audio.play('reveal');
      setGuessFeedback(el, '');
      render();
    }
    el.input.focus();
  };

  el.giveup.onclick = () => {
    if (round.giveUp()) {
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
      app.audio.play('wrong');
      render();
      showAnswerCard('lost');
    }
  };

  el.input.onkeydown = (e) => {
    if (e.key === '+' && el.input.value === '') {
      e.preventDefault();
      el.reveal.click();
    }
  };

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
    cheatPoints() { /* no-op */ },
    destroy() {
      clearTimeout(advanceTimer);
      disarmAdvanceKey();
    },
  };

  showScreen('screen-guess');
  render();
  setGuessFeedback(el, '');
  el.input.value = '';
  el.input.focus();
  return controller;
}
