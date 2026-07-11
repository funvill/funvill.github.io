// The vocabulary checker (design §6.2). Pure module: no DOM, no fetch.
// check(text, wordSet, opts) → { tokens, illegalCount, letterCount, wordCount, forbiddenCount }

/** Build the legal-word Set from the ranked list, honoring vocabSize. */
export function buildWordSet(words, vocabSize) {
  return new Set(words.slice(0, vocabSize).map((w) => w.toLowerCase()));
}

const CONTRACTION_TAILS = ["n't", "'s", "'re", "'ll", "'ve", "'m", "'d"];
const SUFFIXES = ['ing', 'est', 'ed', 'er', 'es', 'ly', 's', 'd'];

/** All candidate base forms a single word-part could reduce to. */
function baseForms(part) {
  const forms = [part];
  for (const suf of SUFFIXES) {
    if (part.length > suf.length && part.endsWith(suf)) {
      const stem = part.slice(0, -suf.length);
      forms.push(stem);
      // restore dropped e: making → mak → make, maker → mak → make
      if (suf === 'ing' || suf === 'ed' || suf === 'er' || suf === 'est' || suf === 'es' || suf === 'd') {
        forms.push(stem + 'e');
      }
      // un-double final consonant: running → runn → run
      if (stem.length >= 2 && stem[stem.length - 1] === stem[stem.length - 2] && /[a-z]/.test(stem[stem.length - 1])) {
        forms.push(stem.slice(0, -1));
      }
      // restore y changed to i: carries → carri → carry, happily → happi → happy
      if (stem.endsWith('i')) {
        forms.push(stem.slice(0, -1) + 'y');
      }
    }
  }
  return forms;
}

/** Is a single hyphen-free part legal against the set? */
function partLegal(part, wordSet) {
  if (part === '') return true; // e.g. dangling hyphen; nothing to judge
  if (/^[0-9]+$/.test(part)) return true;
  let p = part;
  // strip one contraction tail first (design rule 3), then try inflections
  for (const tail of CONTRACTION_TAILS) {
    if (p.length > tail.length && p.endsWith(tail)) {
      p = p.slice(0, -tail.length);
      break;
    }
  }
  if (p.includes("'")) return false; // leftover apostrophes → not a word
  for (const form of baseForms(p)) {
    if (wordSet.has(form)) return true;
  }
  return false;
}

function tokenLegal(word, wordSet) {
  // hyphenated tokens: every part must pass independently
  return word.split('-').every((part) => partLegal(part, wordSet));
}

/** The normalized forms a token could stand for (used for forbidden matching). */
function tokenForms(word) {
  const forms = new Set();
  for (const part of word.split('-')) {
    if (!part) continue;
    let p = part;
    for (const tail of CONTRACTION_TAILS) {
      if (p.length > tail.length && p.endsWith(tail)) {
        p = p.slice(0, -tail.length);
        break;
      }
    }
    for (const f of baseForms(p)) forms.add(f);
  }
  forms.add(word);
  return forms;
}

/**
 * Check text against the word set.
 * opts.forbidden: Set of lowercase words (4+ letters, from the target's
 * name/aliases) that block submission in write mode even though they may
 * be legal vocabulary.
 */
export function check(text, wordSet, opts = {}) {
  const forbiddenSet = opts.forbidden || null;
  const tokens = [];
  let illegalCount = 0;
  let forbiddenCount = 0;
  let letterCount = 0;

  const normalized = text.replace(/[‘’]/g, "'");
  for (const ch of normalized) {
    if (/[a-zA-Z]/.test(ch)) letterCount++;
  }

  const re = /[a-zA-Z0-9'-]+/g;
  let m;
  while ((m = re.exec(normalized)) !== null) {
    const raw = m[0];
    const word = raw.toLowerCase();
    // skip tokens with no letters/digits at all (bare hyphens/apostrophes)
    if (!/[a-z0-9]/.test(word)) continue;
    const legal = tokenLegal(word, wordSet);
    let forbidden = false;
    if (forbiddenSet) {
      for (const f of tokenForms(word)) {
        if (forbiddenSet.has(f)) { forbidden = true; break; }
      }
    }
    if (!legal) illegalCount++;
    if (forbidden) forbiddenCount++;
    tokens.push({ word: raw, start: m.index, end: m.index + raw.length, legal, forbidden });
  }

  return { tokens, illegalCount, letterCount, wordCount: tokens.length, forbiddenCount };
}
