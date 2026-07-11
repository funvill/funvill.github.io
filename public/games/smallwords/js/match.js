// Answer matching (design §6.7), tuned for forgiving spelling.
// A guess is accepted if it is exact, within a generous edit distance, or
// "sounds like" the answer (phonetic match) — the way a spell-checker would
// still surface the right word from a wrong spelling. Pure module.

/** Normalize an answer or guess for comparison. */
export function normalize(s) {
  let t = s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  t = t.replace(/^(a|an|the) /, '');
  return t;
}

/** Classic Levenshtein edit distance. */
export function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

/**
 * Soundex-style phonetic code, WITHOUT the usual 4-char truncation so long
 * words keep resolution. Sound-alike misspellings ("nuclear"/"nucular") map
 * to the same code; the first letter is kept as a letter (standard Soundex),
 * so words that only differ in a leading sound are not merged.
 */
export function soundex(word) {
  const s = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!s) return '';
  const code = (ch) =>
    'bfpv'.includes(ch) ? '1'
    : 'cgjkqsxz'.includes(ch) ? '2'
    : 'dt'.includes(ch) ? '3'
    : ch === 'l' ? '4'
    : 'mn'.includes(ch) ? '5'
    : ch === 'r' ? '6'
    : '';
  let out = s[0];
  let prev = code(s[0]);
  for (let i = 1; i < s.length; i++) {
    const ch = s[i];
    const c = code(ch);
    if (c === '') {
      if (ch !== 'h' && ch !== 'w') prev = ''; // vowels break runs; h/w do not
    } else {
      if (c !== prev) out += c;
      prev = c;
    }
  }
  return out;
}

function phonetic(str) {
  return str.split(/\s+/).filter(Boolean).map(soundex).join(' ');
}

/** Max edit distance allowed for an accepted answer of this length. */
function tolerance(answer) {
  const n = answer.length;
  if (n <= 3) return 0; // short words must be exact — too easy to hit a real word
  if (n === 4) return 1;
  if (n <= 7) return 2;
  return 3; // long words: be very forgiving
}

function withinDistance(a, b) {
  const tol = tolerance(a);
  return Math.abs(a.length - b.length) <= tol && levenshtein(a, b) <= tol;
}

/** Does the guess match any accepted answer (name or alias)? */
export function matches(guess, answers) {
  const g = normalize(guess);
  if (g === '') return false;
  const gTight = g.replace(/\s+/g, '');
  const gPhon = phonetic(g);
  for (const answer of answers) {
    const a = normalize(answer);
    if (a === '') continue;
    if (g === a) return true;
    // generous edit distance, on the spaced form...
    if (withinDistance(a, g)) return true;
    // ...and spacing-insensitive (handles merged or split words)
    const aTight = a.replace(/\s+/g, '');
    if (withinDistance(aTight, gTight)) return true;
    // phonetic "sounds like" — only for longer answers, to avoid short slips
    if (aTight.length >= 5 && gPhon && phonetic(a) === gPhon) return true;
  }
  return false;
}
