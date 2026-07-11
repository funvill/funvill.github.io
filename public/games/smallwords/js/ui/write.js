// Write screen renderer: live underliner backdrop + golf scoring (design §6.6, §11).
// Editor helpers are shared with pass-and-play (ui/passplay.js).

import { createWriteRound } from '../game-write.js';
import { showScreen, setTopbar, escapeHtml, debugOverlay, advanceOnKey, disarmAdvanceKey } from './screens.js';

// Written texts are kept locally for pass-and-play later (design §7);
// nothing is uploaded.
const WRITTEN_KEY = 'smallwords.written.v1';

function saveWritten(results) {
  try {
    const stored = JSON.parse(localStorage.getItem(WRITTEN_KEY) || '[]');
    for (const r of results) {
      if (r.status === 'submitted') {
        stored.push({ objectId: r.object.id, text: r.text, letterCount: r.letterCount, stars: r.stars });
      }
    }
    localStorage.setItem(WRITTEN_KEY, JSON.stringify(stored));
  } catch { /* private mode — fine, nothing persists */ }
}

/** The write screen's elements, shared by solo write and pass-and-play. */
export function getWriteEls() {
  return {
    object: document.getElementById('write-object'),
    category: document.getElementById('write-category'),
    counter: document.getElementById('letter-counter'),
    illegalChip: document.getElementById('illegal-chip'),
    backdrop: document.getElementById('editor-backdrop'),
    input: document.getElementById('write-input'),
    submit: document.getElementById('btn-submit'),
    reason: document.getElementById('submit-reason'),
    skip: document.getElementById('btn-skip'),
  };
}

/** Paint one evaluation result into the write screen (backdrop, counter, chip, submit). */
export function renderEditorState(el, ev, par, config) {
  const text = el.input.value;
  const r = ev.checkResult;

  // backdrop mirror: same text with illegal/forbidden tokens marked
  let html = '';
  let pos = 0;
  for (const t of r.tokens) {
    html += escapeHtml(text.slice(pos, t.start));
    const cls = t.forbidden ? 'forbidden' : !t.legal ? 'illegal' : null;
    html += cls
      ? `<mark class="${cls}">${escapeHtml(text.slice(t.start, t.end))}</mark>`
      : escapeHtml(text.slice(t.start, t.end));
    pos = t.end;
  }
  html += escapeHtml(text.slice(pos));
  el.backdrop.innerHTML = html + '\n'; // trailing newline keeps heights in sync

  el.counter.textContent = `${r.letterCount} / par ${par}`;
  el.counter.className = 'counter ' + (
    r.letterCount <= par ? 'good' : r.letterCount <= par * config.parStar2Multiplier ? 'okay' : ''
  );

  const badCount = r.illegalCount + r.forbiddenCount;
  el.illegalChip.hidden = badCount === 0;
  el.illegalChip.textContent = r.illegalCount > 0
    ? `${r.illegalCount} hard word${r.illegalCount === 1 ? '' : 's'}`
    : 'no naming the thing!';

  el.submit.disabled = !ev.canSubmit;
  el.reason.textContent = ev.canSubmit ? '' : (text.trim() ? ev.blockReason : '');
}

/**
 * Wire the editor's live checking + submit plumbing. Handlers are assigned
 * (not added) so starting a new round replaces the previous round's wiring.
 * Returns { runCheck } so callers can force an immediate re-check.
 */
export function bindEditor(el, app, { evaluate, getPar, onSubmit, onSkip }) {
  let debounceTimer = null;
  let lastIllegalCount = 0;

  function runCheck() {
    const ev = evaluate(el.input.value);
    renderEditorState(el, ev, getPar(), app.config);
    if (ev.checkResult.illegalCount > lastIllegalCount) {
      app.audio.play('illegal', app.config.illegalBlipThrottleMs);
    }
    lastIllegalCount = ev.checkResult.illegalCount;
    return ev;
  }

  function checkAndSubmit() {
    clearTimeout(debounceTimer);
    runCheck();
    onSubmit();
  }

  el.input.oninput = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runCheck, app.config.checkDebounceMs);
  };
  el.input.onscroll = () => {
    el.backdrop.scrollTop = el.input.scrollTop;
    el.backdrop.scrollLeft = el.input.scrollLeft;
  };
  el.input.onkeydown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      checkAndSubmit();
    }
  };
  el.submit.onclick = checkAndSubmit;
  el.skip.onclick = onSkip;

  return { runCheck };
}

export function startWriteRound(app, rand, onEnd) {
  const round = createWriteRound({
    pack: app.pack,
    config: app.config,
    rand,
    wordSet: app.wordSet,
    seenIds: app.seenWrite,
  });

  const el = getWriteEls();
  el.resultScreen = document.getElementById('screen-write-result');
  el.resultStars = document.getElementById('write-result-stars');
  el.resultDetail = document.getElementById('write-result-detail');

  const editor = bindEditor(el, app, {
    evaluate: (text) => round.evaluate(text),
    getPar: () => round.state.item.object.parLetters,
    onSubmit: trySubmit,
    onSkip: () => {
      if (round.skip()) {
        app.audio.play('giveup');
        goNext();
      }
    },
  });

  function renderTarget() {
    const s = round.state;
    setTopbar(`Thing ${s.index + 1} / ${s.total}`, '');
    el.object.textContent = s.item.object.name;
    el.category.textContent = s.item.object.category;
    el.input.value = '';
    editor.runCheck();
    debugOverlay.update(app);
  }

  function showResult(res) {
    const it = round.state.item;
    el.resultStars.textContent = '★'.repeat(res.stars) + '☆'.repeat(3 - res.stars);
    el.resultDetail.textContent = `${res.letterCount} letters against a par of ${it.object.parLetters}. +${res.points} points.`;
    showScreen('screen-write-result');
    for (let i = 0; i < res.stars; i++) {
      setTimeout(() => app.audio.play('star'), 300 + i * 250);
    }
    const advance = () => {
      el.resultScreen.onclick = null;
      disarmAdvanceKey();
      goNext();
    };
    el.resultScreen.onclick = advance;
    advanceOnKey(advance); // Enter / Space → next thing
    if (app.flags.skip) advance();
  }

  function goNext() {
    const more = round.next();
    if (more) {
      showScreen('screen-write');
      renderTarget();
      el.input.focus();
    } else {
      const s = round.state;
      saveWritten(s.results);
      onEnd({
        mode: 'write',
        stars: s.totalStars,
        maxStars: s.total * 3,
        points: s.totalPoints,
        results: s.results,
      });
    }
  }

  function trySubmit() {
    const res = round.submit(el.input.value);
    if (!res) return;
    app.audio.play('stamp');
    showResult(res);
  }

  const controller = {
    debugInfo() {
      const it = round.state.item;
      return it ? { answer: it.object.name, aliases: it.object.aliases } : null;
    },
    cheatSolve() {
      if (round.state.item.status !== 'writing') return;
      round.skip();
      goNext();
    },
    cheatPoints() { /* no-op in write mode */ },
  };

  showScreen('screen-write');
  renderTarget();
  el.input.focus();
  return controller;
}
