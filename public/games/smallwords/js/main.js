// Boot, URL flags, screen router, global keys (design §11–§12).

import { CONFIG, VERSION } from './config.js';
import { hashString, mulberry32 } from './rng.js';
import { buildWordSet } from './checker.js';
import { audio } from './audio.js';
import { showScreen, setTopbarVisible, setTopbar, renderSplash, renderHistoryPage, renderEnd, pauseOverlay, debugOverlay, disarmAdvanceKey } from './ui/screens.js';
import { startGuessRound } from './ui/guess.js';
import { startWriteRound } from './ui/write.js';
import { startPassPlay } from './ui/passplay.js';
import { startTimedRound } from './ui/timed.js';

const params = new URLSearchParams(location.search);
const flags = {
  seed: params.get('seed') || String(Date.now()),
  mode: params.get('mode'),
  five: params.get('five') === '1',
  debug: params.get('debug') === '1',
  skip: params.get('skip') === '1',
};

if (flags.five) CONFIG.vocabSize = 500;

const app = {
  config: CONFIG,
  version: VERSION,
  flags,
  words: null,
  pack: null,
  wordSet: null,       // full vocabSize set (write mode obeys ?five)
  seenGuess: new Set(),
  seenWrite: new Set(),
  seenPass: new Set(),
  seenTimed: new Set(),
  best: {},            // best scores per mode, persisted
  history: [],         // every completed game, persisted
  mode: null,          // 'guess' | 'write'
  round: null,         // active round controller (has .cheat hooks)
  roundSeedCounter: 0,
  audio,
};

/** Fresh deterministic rand per round: same ?seed → same first round. */
app.nextRand = function (restartSame) {
  if (!restartSame) app.roundSeedCounter++;
  return mulberry32(hashString(flags.seed + ':' + app.roundSeedCounter));
};

function toSplash() {
  if (app.round && app.round.destroy) app.round.destroy();
  disarmAdvanceKey();
  hideQuitConfirm(false);
  pauseOverlay.hide();
  app.mode = null;
  app.round = null;
  setTopbarVisible(false);
  showScreen('screen-splash');
}

function openHistory() {
  disarmAdvanceKey();
  setTopbarVisible(false);
  renderHistoryPage(app);
  showScreen('screen-history');
}

/** Persistent footer version (design §11), always visible. */
function updateFooter() {
  document.getElementById('footer-version').textContent =
    'SMALL WORDS · v' + VERSION + (CONFIG.vocabSize === 500 ? ' · Five Hundred mode' : '');
}

// ---- quit confirmation ----

function showQuitConfirm() {
  if (!app.mode) return;
  if (app.round && app.round.setPaused) app.round.setPaused(true); // freeze the clock while asking
  document.getElementById('overlay-quit').hidden = false;
}

function hideQuitConfirm(resume) {
  document.getElementById('overlay-quit').hidden = true;
  if (resume && !pauseOverlay.visible && app.round && app.round.setPaused) {
    app.round.setPaused(false);
  }
}

function quitConfirmVisible() {
  return !document.getElementById('overlay-quit').hidden;
}

function startMode(mode, { restartSame = false } = {}) {
  if (app.round && app.round.destroy) app.round.destroy(); // stop any prior timer
  disarmAdvanceKey(); // drop any lingering "press Enter to continue" listener
  app.mode = mode;
  setTopbarVisible(true);
  document.getElementById('btn-pause').hidden = false;
  const rand = app.nextRand(restartSame);
  if (mode === 'guess') {
    app.round = startGuessRound(app, rand, onRoundEnd);
  } else if (mode === 'timed') {
    app.round = startTimedRound(app, rand, onRoundEnd);
  } else if (mode === 'pass') {
    app.round = startPassPlay(app, rand, onRoundEnd);
  } else {
    app.round = startWriteRound(app, rand, onRoundEnd);
  }
  debugOverlay.update(app);
}

const BEST_KEY = 'smallwords.best.v1';
const HISTORY_KEY = 'smallwords.history.v1';
const HISTORY_CAP = 200; // keep a long tail, but bound localStorage growth

/** Reduce a round summary to { mode, score, detail } for best-tracking + history. */
function summarize(summary) {
  if (summary.mode === 'guess' || summary.mode === 'timed') {
    return { mode: summary.mode, score: summary.score, detail: summary.rank };
  }
  if (summary.mode === 'write') {
    return { mode: summary.mode, score: summary.points, detail: '★'.repeat(summary.stars) };
  }
  // pass-and-play
  const [p1, p2] = summary.scores;
  return { mode: summary.mode, score: Math.max(p1, p2), detail: `${p1}–${p2}` };
}

function recordGame(summary) {
  const s = summarize(summary);
  // best per mode (ignore scoreless rounds)
  if (s.score > 0 && (app.best[s.mode] == null || s.score > app.best[s.mode])) {
    app.best[s.mode] = s.score;
    try { localStorage.setItem(BEST_KEY, JSON.stringify(app.best)); } catch { /* fine */ }
  }
  // full history of every game played
  app.history.push(s);
  if (app.history.length > HISTORY_CAP) app.history = app.history.slice(-HISTORY_CAP);
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(app.history)); } catch { /* fine */ }
}

function onRoundEnd(summary) {
  app.round = null;
  setTopbarVisible(false);
  recordGame(summary);
  renderEnd(app, summary, {
    onAgain: () => startMode(summary.mode),
    onMenu: toSplash,
  });
}

// ---- pause / global keys ----

function togglePause() {
  if (!app.mode) return; // only in-game
  pauseOverlay.toggle();
  if (app.round && app.round.setPaused) app.round.setPaused(pauseOverlay.visible);
}

function resumeGame() {
  pauseOverlay.hide();
  if (app.round && app.round.setPaused) app.round.setPaused(false);
}

function restartRound() {
  if (!app.mode) return;
  pauseOverlay.hide();
  startMode(app.mode, { restartSame: true });
}

function isTextFieldFocused() {
  const el = document.activeElement;
  return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');
}

function updateMuteButtons() {
  const label = audio.muted ? '🔇' : '🔊';
  document.getElementById('btn-mute').textContent = label;
  document.getElementById('btn-pause-mute').textContent = audio.muted ? 'Sound on' : 'Mute';
}

function toggleMute() {
  audio.toggleMute();
  updateMuteButtons();
}

document.addEventListener('keydown', (e) => {
  if (quitConfirmVisible()) {
    if (e.key === 'Escape') { e.preventDefault(); hideQuitConfirm(true); }
    return;
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    togglePause();
    return;
  }
  if (pauseOverlay.visible) {
    if (e.key === 'r' || e.key === 'R') restartRound();
    return;
  }
  if (isTextFieldFocused()) return;
  if (e.key === 'm' || e.key === 'M') toggleMute();
  if ((e.key === 'r' || e.key === 'R') && !document.getElementById('screen-end').hidden && app.lastSummary) {
    startMode(app.lastSummary.mode);
  }
  // debug cheats
  if (flags.debug && app.round) {
    if (e.key === 'n' || e.key === 'N') app.round.cheatSolve && app.round.cheatSolve();
    if (e.key === ']') app.round.cheatPoints && app.round.cheatPoints(100);
  }
});

// first gesture unlocks audio
document.addEventListener('pointerdown', () => audio.unlock(), { once: true });
document.addEventListener('keydown', () => audio.unlock(), { once: true });

// ---- boot ----

async function boot() {
  const [words, pack] = await Promise.all([
    fetch('data/words.json').then((r) => r.json()),
    fetch('data/pack.json').then((r) => r.json()),
  ]);
  app.words = words;
  app.pack = pack;
  app.wordSet = buildWordSet(words, CONFIG.vocabSize);
  try { app.best = JSON.parse(localStorage.getItem(BEST_KEY) || '{}'); } catch { app.best = {}; }
  try { app.history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { app.history = []; }
  if (!Array.isArray(app.history)) app.history = [];
  updateFooter();

  renderSplash(app, {
    onGuess: () => startMode('guess'),
    onTimed: () => startMode('timed'),
    onWrite: () => startMode('write'),
    onPass: () => startMode('pass'),
    onHistory: openHistory,
    onFiveToggle: (on) => {
      CONFIG.vocabSize = on ? 500 : 1000;
      app.wordSet = buildWordSet(app.words, CONFIG.vocabSize);
      updateFooter();
      debugOverlay.update(app);
    },
  });

  // tiny tick on every button (P1 sound); guess/submit have their own sounds
  document.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b && !b.disabled && b.id !== 'btn-guess' && b.id !== 'btn-submit') {
      audio.play('tick');
    }
  });

  document.getElementById('btn-pause').onclick = togglePause;
  document.getElementById('btn-mute').onclick = toggleMute;
  document.getElementById('btn-resume').onclick = resumeGame;
  document.getElementById('btn-restart').onclick = restartRound;
  document.getElementById('btn-pause-mute').onclick = toggleMute;
  document.getElementById('btn-quit').onclick = showQuitConfirm;
  document.getElementById('btn-quit-game').onclick = showQuitConfirm;
  document.getElementById('btn-quit-yes').onclick = () => { hideQuitConfirm(false); toSplash(); };
  document.getElementById('btn-quit-no').onclick = () => hideQuitConfirm(true);
  document.getElementById('btn-history-back').onclick = toSplash;
  updateMuteButtons();

  if (flags.debug) debugOverlay.show(app);

  if (['guess', 'timed', 'write', 'pass'].includes(flags.mode)) {
    startMode(flags.mode);
  } else {
    toSplash();
  }
}

boot().catch((err) => {
  document.body.innerHTML = `<div style="padding:2rem;font-family:sans-serif">Could not load the game data. If you opened this file directly, serve the folder instead (any static server works).<br><br><code>${String(err)}</code></div>`;
});
