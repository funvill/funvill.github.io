// Splash, end-of-round, pause and debug overlays, screen router.

const SCREENS = ['screen-splash', 'screen-history', 'screen-guess', 'screen-answer', 'screen-write', 'screen-write-result', 'screen-handoff', 'screen-end'];

export function showScreen(id) {
  for (const s of SCREENS) {
    document.getElementById(s).hidden = s !== id;
  }
}

export function setTopbarVisible(visible) {
  document.getElementById('topbar').hidden = !visible;
}

export function setTopbar(left, center) {
  document.getElementById('topbar-left').textContent = left;
  document.getElementById('topbar-center').textContent = center;
}

export function renderSplash(app, { onGuess, onTimed, onWrite, onPass, onFiveToggle, onHistory }) {
  document.getElementById('btn-mode-guess').onclick = onGuess;
  document.getElementById('btn-mode-timed').onclick = onTimed;
  document.getElementById('btn-mode-write').onclick = onWrite;
  document.getElementById('btn-mode-pass').onclick = onPass;
  document.getElementById('btn-open-history').onclick = onHistory;
  const toggle = document.getElementById('five-toggle');
  toggle.checked = app.config.vocabSize === 500;
  toggle.onchange = () => onFiveToggle(toggle.checked);
}

const MODE_LABEL = { guess: 'Take Your Time', timed: 'Beat the Clock', write: 'Write', pass: 'Pass & Play' };

/** The full "Your Games" page: stats + bests + every game ever played. */
export function renderHistoryPage(app) {
  renderStats(app);
  renderBestScores(app);
  renderHistory(app);
}

function renderStats(app) {
  const el = document.getElementById('history-stats');
  const games = app.history || [];
  const played = games.length;
  const modes = new Set(games.map((g) => g.mode)).size;
  const topScore = games.reduce((m, g) => Math.max(m, g.score || 0), 0);
  const box = (num, label) => `<div class="stat-box"><div class="stat-num">${num}</div><div class="stat-label">${label}</div></div>`;
  el.innerHTML = box(played, played === 1 ? 'game played' : 'games played')
    + box(modes, 'modes tried')
    + box(topScore, 'top score');
}

/** The scrollable "past games" list (every game ever played). */
export function renderHistory(app) {
  const el = document.getElementById('history');
  const games = app.history || [];
  if (!games.length) { el.innerHTML = '<div class="history-empty">No games yet — go play one!</div>'; return; }
  const rows = games.slice().reverse().map((g) => {
    const mode = MODE_LABEL[g.mode] || g.mode;
    return `<div class="history-row"><span class="h-mode">${escapeHtml(mode)}</span>`
      + `<span class="h-score">${escapeHtml(String(g.score))}</span>`
      + `<span class="h-detail">${escapeHtml(g.detail || '')}</span></div>`;
  }).join('');
  el.innerHTML = `<div class="history-title">Every game (${games.length})</div>`
    + `<div class="history-list">${rows}</div>`;
}

/** "Best so far" line on the history page. */
export function renderBestScores(app) {
  const el = document.getElementById('best-scores');
  const best = app.best || {};
  const parts = [];
  if (best.timed) parts.push(`Beat the Clock ${best.timed}`);
  if (best.guess) parts.push(`Take Your Time ${best.guess}`);
  if (best.write) parts.push(`Write ${best.write}`);
  if (best.pass) parts.push(`Pass & Play ${best.pass}`);
  el.textContent = parts.length ? 'Best so far: ' + parts.join(' · ') : '';
}

export function renderEnd(app, summary, { onAgain, onMenu }) {
  app.lastSummary = summary;
  const total = document.getElementById('end-total');
  const rank = document.getElementById('end-rank');
  const breakdown = document.getElementById('end-breakdown');
  breakdown.innerHTML = '';

  total.classList.remove('star-total');
  if (summary.mode === 'guess' || summary.mode === 'timed') {
    total.textContent = `${summary.score} points`;
    rank.textContent = summary.rank;
    app.audio.play('fanfare', summary.warmth);
    for (const r of summary.results) {
      const row = document.createElement('div');
      row.className = 'breakdown-row';
      const status = r.status === 'won' ? `+${r.banked}` : r.status === 'gaveup' ? 'gave up' : 'missed';
      row.innerHTML = `<span class="bd-name">${escapeHtml(r.object.name)}</span><span class="bd-score ${r.status === 'won' ? 'good' : 'bad'}">${status}</span>`;
      breakdown.appendChild(row);
    }
  } else if (summary.mode === 'pass') {
    const [p1, p2] = summary.scores;
    total.textContent = `${p1} — ${p2}`;
    rank.textContent = p1 === p2 ? 'A tie. Play again!' : `Player ${p1 > p2 ? 1 : 2} wins!`;
    app.audio.play('fanfare', Math.max(p1, p2) >= 250 ? 2 : Math.max(p1, p2) >= 120 ? 1 : 0);
    for (const lr of summary.legResults) {
      const row = document.createElement('div');
      row.className = 'breakdown-row';
      const detail = lr.status === 'won'
        ? `guesser +${lr.guesserPoints} · writer +${lr.writerPoints}`
        : lr.status;
      row.innerHTML = `<span class="bd-name">${escapeHtml(lr.object.name)} <small>(Player ${lr.writerIndex + 1} wrote)</small></span>` +
        `<span class="bd-score ${lr.status === 'won' ? 'good' : 'bad'}">${escapeHtml(detail)}</span>`;
      if (lr.text) {
        const text = document.createElement('div');
        text.className = 'bd-text game-text';
        text.textContent = lr.text;
        row.appendChild(text);
      }
      breakdown.appendChild(row);
    }
  } else {
    total.textContent = '★'.repeat(summary.stars) + '☆'.repeat(summary.maxStars - summary.stars);
    total.classList.add('star-total');
    rank.textContent = `${summary.points} points`;
    app.audio.play('fanfare', summary.stars >= 7 ? 2 : summary.stars >= 4 ? 1 : 0);
    for (const r of summary.results) {
      const row = document.createElement('div');
      row.className = 'breakdown-row';
      const detail = r.status === 'submitted'
        ? `${'★'.repeat(r.stars)} · ${r.letterCount} letters (par ${r.object.parLetters})`
        : 'skipped';
      row.innerHTML = `<span class="bd-name">${escapeHtml(r.object.name)}</span><span class="bd-score ${r.status === 'submitted' ? 'good' : 'bad'}">${detail}</span>`;
      if (r.status === 'submitted') {
        const text = document.createElement('div');
        text.className = 'bd-text game-text';
        text.textContent = r.text;
        row.appendChild(text);
      }
      breakdown.appendChild(row);
    }
  }

  document.getElementById('btn-again').onclick = onAgain;
  document.getElementById('btn-menu').onclick = onMenu;
  showScreen('screen-end');
}

export const pauseOverlay = {
  get visible() { return !document.getElementById('overlay-pause').hidden; },
  show() { document.getElementById('overlay-pause').hidden = false; },
  hide() { document.getElementById('overlay-pause').hidden = true; },
  toggle() { this.visible ? this.hide() : this.show(); },
};

export const debugOverlay = {
  show(app) {
    document.getElementById('overlay-debug').hidden = false;
    this.update(app);
  },
  update(app) {
    const el = document.getElementById('overlay-debug');
    if (el.hidden) return;
    const item = app.round && app.round.debugInfo ? app.round.debugInfo() : null;
    el.innerHTML = [
      `mode: ${app.mode || 'splash'}`,
      `seed: ${app.flags.seed}`,
      `vocabSize: ${app.config.vocabSize}`,
      item ? `answer: ${escapeHtml(item.answer)}` : '',
      item && item.aliases && item.aliases.length ? `aliases: ${escapeHtml(item.aliases.join(', '))}` : '',
      'cheats: N solve · ] +100',
    ].filter(Boolean).join('<br>');
  },
};

/**
 * Let the player press Enter (or Space) to dismiss a revealed-answer card and
 * move on — keyboard-only play, no mouse needed. Single-slot: arming a new one
 * disarms the previous, and mode changes call disarmAdvanceKey() so a lingering
 * listener can never fire on the wrong screen.
 */
let armedAdvanceHandler = null;

export function advanceOnKey(advance) {
  disarmAdvanceKey();
  const handler = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      disarmAdvanceKey();
      advance();
    }
  };
  armedAdvanceHandler = handler;
  document.addEventListener('keydown', handler);
}

export function disarmAdvanceKey() {
  if (armedAdvanceHandler) {
    document.removeEventListener('keydown', armedAdvanceHandler);
    armedAdvanceHandler = null;
  }
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
