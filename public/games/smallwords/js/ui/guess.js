// Guess screen renderer + wiring (design §11 guess screen).
// Render helpers are shared with pass-and-play (ui/passplay.js).

import { createGuessRound } from '../game-guess.js';
import { showScreen, setTopbar, escapeHtml, debugOverlay, advanceOnKey, disarmAdvanceKey } from './screens.js';

/** The guess screen's elements, shared by solo guess and pass-and-play. */
export function getGuessEls() {
  return {
    category: document.getElementById('guess-category'),
    pips: document.getElementById('guess-pips'),
    meterFill: document.getElementById('meter-fill'),
    meterValue: document.getElementById('meter-value'),
    text: document.getElementById('guess-text'),
    reveal: document.getElementById('btn-reveal'),
    giveup: document.getElementById('btn-giveup'),
    form: document.getElementById('guess-form'),
    input: document.getElementById('guess-input'),
    wrong: document.getElementById('wrong-guesses'),
    feedback: document.getElementById('guess-feedback'),
    answerScreen: document.getElementById('screen-answer'),
    answerResult: document.getElementById('answer-result'),
    answerName: document.getElementById('answer-name'),
    answerPoints: document.getElementById('answer-points'),
    answerFull: document.getElementById('answer-fulltext'),
  };
}

/** Paint one guess item (category, pips, meter, revealed text, wrong list). */
export function renderGuessItem(el, item, config) {
  el.category.textContent = item.object.category;
  el.pips.innerHTML = Array.from({ length: config.maxWrongGuesses }, (_, i) =>
    `<span class="pip ${i < item.wrongGuesses.length ? 'pip-filled' : ''}"></span>`
  ).join('');

  el.meterValue.textContent = item.value;
  el.meterFill.style.width = (item.value / config.startValue) * 100 + '%';

  el.text.innerHTML = item.words.map((w, i) =>
    i < item.revealedWords
      ? `<span class="w">${escapeHtml(w)}</span>`
      : `<span class="w blank" aria-hidden="true">${'▁'.repeat(Math.min(w.length, 12))}</span>`
  ).join(' ');
  el.meterValue.setAttribute('aria-label', `${item.value} points left`);

  el.reveal.textContent = `Show more (−${config.revealCost})`;
  el.reveal.disabled = item.fullyRevealed;

  el.wrong.innerHTML = item.wrongGuesses.length
    ? 'Not it: ' + item.wrongGuesses.map((g) => `<span class="wrong-item">${escapeHtml(g)}</span>`).join(' ')
    : '';
}

/** Restartable shake animation on the guess input. */
export function shakeInput(el) {
  el.input.classList.remove('shake');
  void el.input.offsetWidth;
  el.input.classList.add('shake');
}

export function setGuessFeedback(el, msg, cls) {
  el.feedback.textContent = msg;
  el.feedback.className = 'feedback ' + (cls || '');
}

export function startGuessRound(app, rand, onEnd, opts = {}) {
  const mode = opts.mode || 'guess';        // e.g. 'daily' reuses this UI
  const cfg = opts.config || app.config;    // daily overrides round length + ranks
  const round = createGuessRound({
    pack: app.pack,
    config: cfg,
    rand,
    seenIds: opts.seenIds || app.seenGuess,
  });

  const el = getGuessEls();
  el.reveal.hidden = false; // timed mode hides it; make sure it is back
  let advanceTimer = null;
  let shownScore = 0; // for the count-up animation

  function render() {
    const s = round.state;
    setTopbar(`Score ${s.roundScore}`, `${s.index + 1} / ${s.total}`);
    animateScoreTo(s.roundScore);
    renderGuessItem(el, s.item, app.config);
    debugOverlay.update(app);
  }

  function animateScoreTo(target) {
    const from = shownScore;
    if (from === target) return;
    shownScore = target;
    // respect reduced-motion: jump straight to the value, no count-up tween
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.getElementById('topbar-left').textContent = `Score ${target}`;
      return;
    }
    const start = performance.now();
    const dur = 200;
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const v = Math.round(from + (target - from) * t);
      document.getElementById('topbar-left').textContent = `Score ${v}`;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function showAnswerCard(kind) {
    const s = round.state;
    const it = s.item;
    el.answerResult.textContent =
      kind === 'won' ? 'You got it!' : kind === 'gaveup' ? 'It was:' : 'That is not it. It was:';
    el.answerResult.className = 'answer-result ' + (kind === 'won' ? 'good' : 'bad');
    el.answerName.textContent = it.object.name;
    el.answerPoints.textContent = kind === 'won' ? `+${it.banked} points` : '+0 points';
    el.answerFull.textContent = it.words.join(' ');
    showScreen('screen-answer');

    const advance = () => {
      clearTimeout(advanceTimer);
      el.answerScreen.onclick = null;
      disarmAdvanceKey();
      const more = round.next();
      if (more) {
        showScreen('screen-guess');
        render();
        el.input.value = '';
        el.input.focus();
      } else {
        finish();
      }
    };
    el.answerScreen.onclick = advance;
    advanceOnKey(advance); // Enter / Space → next puzzle (keyboard play)
    if (app.flags.skip) {
      advance();
    } else if (kind === 'won') {
      advanceTimer = setTimeout(advance, app.config.answerRevealMs);
    }
    // losses wait for a click / keypress so the player can read the full text
  }

  function finish() {
    const s = round.state;
    const [wizard, quick] = cfg.rankThresholds;
    onEnd({
      mode,
      score: s.roundScore,
      rank: s.rank,
      warmth: s.roundScore >= wizard ? 2 : s.roundScore >= quick ? 1 : 0,
      results: s.results,
    });
  }

  // --- events ---

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

  // "+" reveals when the guess input is empty (design §5)
  el.input.onkeydown = (e) => {
    if (e.key === '+' && el.input.value === '') {
      e.preventDefault();
      el.reveal.click();
    }
  };

  // --- controller interface for main.js ---
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
    cheatPoints() {
      shownScore += 100;
      setTopbar(`Score ${shownScore}`, '');
    },
  };

  showScreen('screen-guess');
  render();
  setGuessFeedback(el, '');
  el.input.value = '';
  el.input.focus();
  return controller;
}
