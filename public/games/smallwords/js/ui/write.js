// Write screen renderer: live underliner backdrop + golf scoring (design §6.6, §11).
// Editor helpers are shared with pass-and-play (ui/passplay.js).

import { evaluateText, forbiddenWordsFor } from '../game-write.js';
import { shuffle } from '../rng.js';
import { showScreen, setTopbar, escapeHtml, debugOverlay } from './screens.js';

// Submitted descriptions are kept locally so the player can copy/send them.
const WRITTEN_KEY = 'smallwords.written.v1';

function saveWritten(object, text) {
  try {
    const stored = JSON.parse(localStorage.getItem(WRITTEN_KEY) || '[]');
    stored.push({ objectId: object.id, name: object.name, text });
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

/** Paint one evaluation result into the write screen (backdrop, counter, chip, submit).
 *  opts.noPar → show a plain letter count (submission mode has no golf par). */
export function renderEditorState(el, ev, par, config, opts = {}) {
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

  if (opts.noPar) {
    el.counter.textContent = `${r.letterCount} letters · ${r.wordCount} words`;
    el.counter.className = 'counter';
  } else {
    el.counter.textContent = `${r.letterCount} / par ${par}`;
    el.counter.className = 'counter ' + (
      r.letterCount <= par ? 'good' : r.letterCount <= par * config.parStar2Multiplier ? 'okay' : ''
    );
  }

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
export function bindEditor(el, app, { evaluate, getPar, onSubmit, onSkip, noPar = false }) {
  let debounceTimer = null;
  let lastIllegalCount = 0;

  function runCheck() {
    const ev = evaluate(el.input.value);
    renderEditorState(el, ev, getPar(), app.config, { noPar });
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

// "Submit a Description": describe a thing using only small words, live-checked,
// then send it to the game maker. No golf score — this is a content tool.
export function startWriteRound(app, rand, onExit) {
  const el = getWriteEls();
  const res = {
    screen: document.getElementById('screen-write-result'),
    desc: document.getElementById('submitted-desc'),
    form: document.getElementById('btn-form-desc'),
    copy: document.getElementById('btn-copy-desc'),
    email: document.getElementById('btn-email-desc'),
    toast: document.getElementById('submit-toast'),
    another: document.getElementById('btn-write-another'),
    menu: document.getElementById('btn-write-menu'),
  };

  // a shuffled queue of things to describe, honoring the session "seen" set
  let queue = [];
  function nextObject() {
    if (!queue.length) {
      queue = shuffle(app.pack.objects, rand).filter((o) => !app.seenWrite.has(o.id));
      if (!queue.length) { app.seenWrite.clear(); queue = shuffle(app.pack.objects, rand); }
    }
    const o = queue.shift();
    app.seenWrite.add(o.id);
    return o;
  }
  let current = nextObject();

  const editor = bindEditor(el, app, {
    evaluate: (text) => evaluateText(text, app.wordSet, app.config, forbiddenWordsFor(current)),
    getPar: () => current.parLetters,
    onSubmit: trySubmit,
    onSkip: () => { current = nextObject(); renderTarget(); el.input.focus(); },
    noPar: true,
  });

  function renderTarget() {
    setTopbar('Describe a thing', '');
    el.object.textContent = current.name;
    el.category.textContent = current.category;
    el.input.value = '';
    editor.runCheck();
    debugOverlay.update(app);
  }

  function trySubmit() {
    const ev = evaluateText(el.input.value, app.wordSet, app.config, forbiddenWordsFor(current));
    const r = ev.checkResult;
    if (r.illegalCount > 0 || r.forbiddenCount > 0 || r.wordCount < 1) return;
    const text = el.input.value.replace(/\s+/g, ' ').trim();
    app.audio.play('stamp');
    saveWritten(current, text);
    showThanks(current, text);
  }

  let toastTimer = null;
  function toast(msg) {
    res.toast.textContent = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { res.toast.textContent = ''; }, 2500);
  }

  function showThanks(object, text) {
    res.desc.textContent = `“${text}”  — (${object.name})`;
    res.toast.textContent = '';

    // Anonymous Google Form (if configured) is the primary way to submit.
    const form = app.config.submitForm;
    const formOn = form && form.viewformUrl && form.textEntry;
    res.form.hidden = !formOn;
    if (formOn) {
      res.form.onclick = () => {
        const p = new URLSearchParams({ usp: 'pp_url' });
        if (form.thingEntry) p.set(form.thingEntry, object.name);
        p.set(form.textEntry, text);
        window.open(form.viewformUrl + '?' + p.toString(), '_blank', 'noopener');
        toast('Opening the form — thank you!');
      };
    }

    res.copy.onclick = async () => {
      const payload = `SMALL WORDS description\nThing: ${object.name}\n${text}`;
      try { await navigator.clipboard.writeText(payload); toast('Copied! Now paste it in a message.'); }
      catch { toast('Could not copy — select the text above.'); }
    };

    const email = app.config.submitEmail;
    res.email.hidden = !email;
    if (email) {
      const subject = encodeURIComponent('A new SMALL WORDS description');
      const body = encodeURIComponent(`Thing: ${object.name}\n\n${text}`);
      res.email.onclick = () => { window.location.href = `mailto:${email}?subject=${subject}&body=${body}`; };
    }

    res.another.onclick = () => {
      current = nextObject();
      showScreen('screen-write');
      renderTarget();
      el.input.focus();
    };
    res.menu.onclick = onExit;

    showScreen('screen-write-result');
  }

  const controller = {
    debugInfo() { return { answer: current.name, aliases: current.aliases }; },
    cheatSolve() { current = nextObject(); renderTarget(); el.input.focus(); },
    cheatPoints() { /* no-op */ },
    destroy() { clearTimeout(toastTimer); },
  };

  showScreen('screen-write');
  renderTarget();
  el.input.focus();
  return controller;
}
