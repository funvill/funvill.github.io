// Sound (design §10): ZzFX micro-synth, no asset files, no network.
// AudioContext is created/resumed only on the first user gesture.

// ZzFX - Zuper Zmall Zound Zynth v1.3.1 (MIT-licensed micro sound generator
// by Frank Force, https://github.com/KilledByAPixel/ZzFX) — inlined, adapted
// to use a lazily-created context.

let ctx = null;
const sampleRate = 44100;

function ensureContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function zzfx(
  volume = 1, randomness = 0.05, frequency = 220, attack = 0, sustain = 0,
  release = 0.1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0,
  pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0,
  bitCrush = 0, delay = 0, sustainVolume = 1, decay = 0, tremolo = 0, filter = 0
) {
  const context = ensureContext();
  let PI2 = Math.PI * 2,
    sign = (v) => (v < 0 ? -1 : 1),
    startSlide = (slide *= (500 * PI2) / sampleRate / sampleRate),
    startFrequency = (frequency *= ((1 + randomness * 2 * (Math.random() - 0.5)) * PI2) / sampleRate),
    b = [], t = 0, tm = 0, i = 0, j = 1, r = 0, c = 0, s = 0, f, length,
    quality = 2, w = (PI2 * Math.abs(filter) * 2) / sampleRate,
    cos = Math.cos(w), alpha = Math.sin(w) / 2 / quality,
    a0 = 1 + alpha, a1 = (-2 * cos) / a0, a2 = (1 - alpha) / a0,
    b0 = (1 + sign(filter) * cos) / 2 / a0,
    b1 = -(sign(filter) + cos) / a0, b2 = b0,
    x2 = 0, x1 = 0, y2 = 0, y1 = 0;

  attack = attack * sampleRate + 9;
  decay *= sampleRate;
  sustain *= sampleRate;
  release *= sampleRate;
  delay *= sampleRate;
  deltaSlide *= (500 * PI2) / sampleRate ** 3;
  modulation *= PI2 / sampleRate;
  pitchJump *= PI2 / sampleRate;
  pitchJumpTime *= sampleRate;
  repeatTime = (repeatTime * sampleRate) | 0;
  volume *= 0.3;

  for (length = (attack + decay + sustain + release + delay) | 0; i < length; b[i++] = s * volume) {
    if (!(++c % ((bitCrush * 100) | 0))) {
      s = shape
        ? shape > 1
          ? shape > 2
            ? shape > 3
              ? Math.sin(t ** 3)
              : Math.max(Math.min(Math.tan(t), 1), -1)
            : 1 - (((((2 * t) / PI2) % 2) + 2) % 2)
          : 1 - 4 * Math.abs(Math.round(t / PI2) - t / PI2)
        : Math.sin(t);
      s = (repeatTime ? 1 - tremolo + tremolo * Math.sin((PI2 * i) / repeatTime) : 1) *
        sign(s) * Math.abs(s) ** shapeCurve *
        (i < attack ? i / attack
          : i < attack + decay ? 1 - ((i - attack) / decay) * (1 - sustainVolume)
          : i < attack + decay + sustain ? sustainVolume
          : i < length - delay ? ((length - i - delay) / release) * sustainVolume
          : 0);
      s = delay
        ? s / 2 + (delay > i ? 0 : ((i < length - delay ? 1 : (length - i) / delay) * b[(i - delay) | 0]) / 2 / volume)
        : s;
      if (filter) s = y1 = b2 * x2 + b1 * (x2 = x1) + b0 * (x1 = s) - a2 * y2 - a1 * (y2 = y1);
    }
    f = (frequency += slide += deltaSlide) * Math.cos(modulation * tm++);
    t += f + f * noise * Math.sin(i ** 5);
    if (j && ++j > pitchJumpTime) { frequency += pitchJump; startFrequency += pitchJump; j = 0; }
    if (repeatTime && !(++r % repeatTime)) { frequency = startFrequency; slide = startSlide; j = j || 1; }
  }

  const buffer = context.createBuffer(1, b.length, sampleRate);
  buffer.getChannelData(0).set(b);
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
  return source;
}

// --- named event map ---

const MUTE_KEY = 'smallwords.muted.v1';
let muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch { /* private mode */ }

let lastBlip = 0;

const SOUNDS = {
  // bright two-note rising chime
  correct: () => {
    zzfx(0.7, 0.01, 523, 0.01, 0.08, 0.15, 0, 1.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 0.02);
    setTimeout(() => zzfx(0.7, 0.01, 784, 0.01, 0.1, 0.2, 0, 1.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 0.02), 110);
  },
  // short dull thud, slight downward pitch
  wrong: () => zzfx(0.8, 0.02, 160, 0.005, 0.04, 0.12, 1, 1.5, -8, 0, 0, 0, 0, 0.1, 0, 0, 0, 0.7, 0.03),
  // soft paper-flip whoosh
  reveal: () => zzfx(0.35, 0.05, 900, 0.005, 0.03, 0.08, 4, 0.5, 0, 0, 0, 0, 0, 2.5, 0, 0.4, 0, 0.5, 0.02),
  // very quiet low blip (throttled by caller config)
  illegal: () => zzfx(0.15, 0.02, 140, 0.001, 0.02, 0.05, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 0.01),
  // satisfying rubber-stamp thunk
  stamp: () => zzfx(0.9, 0.02, 110, 0.002, 0.05, 0.15, 1, 2, -4, 0, 0, 0, 0, 0.05, 0, 0.1, 0, 0.9, 0.04),
  // descending sad slide
  giveup: () => zzfx(0.5, 0.02, 400, 0.01, 0.15, 0.25, 0, 1, -6, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0.05),
  // tiny tick
  tick: () => zzfx(0.3, 0.01, 1200, 0.001, 0.01, 0.03, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0.005),
  // ascending ping per star
  star: () => zzfx(0.5, 0.01, 880, 0.005, 0.06, 0.15, 0, 1.5, 0, 0, 200, 0.05, 0, 0, 0, 0, 0, 0.7, 0.02),
};

// three-note fanfare, warmer with higher rank (0 = lowest, 2 = highest)
function fanfare(warmth) {
  const base = [330, 392, 494][Math.min(2, Math.max(0, warmth))];
  [0, 140, 300].forEach((delay, i) => {
    setTimeout(() => zzfx(0.6, 0.01, base * [1, 1.25, 1.5][i], 0.01, 0.12, 0.25, 0, 1.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 0.04), delay);
  });
}

export const audio = {
  get muted() { return muted; },

  toggleMute() {
    muted = !muted;
    try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch { /* ignore */ }
    return muted;
  },

  /** Play a named sound. 'fanfare' takes a warmth argument 0–2. */
  play(name, arg) {
    if (muted) return;
    try {
      if (name === 'fanfare') return fanfare(arg ?? 0);
      if (name === 'illegal') {
        const now = Date.now();
        if (now - lastBlip < (arg ?? 1000)) return;
        lastBlip = now;
      }
      SOUNDS[name] && SOUNDS[name]();
    } catch { /* audio must never break the game */ }
  },

  /** Call on the first user gesture so the context exists before play(). */
  unlock() {
    try { ensureContext(); } catch { /* no audio available */ }
  },
};
