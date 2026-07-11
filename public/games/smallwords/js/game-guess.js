// Guess-round state machine (design §4, §7). Pure: no DOM, no fetch.
// Takes plain objects; exposes state + action methods so node --test can
// assert the whole scoring math.

import { shuffle } from './rng.js';
import { matches, normalize } from './match.js';

/**
 * Pick descriptions for a round: seeded shuffle, composition
 * 2× diff-1, 2× diff-2, 1× diff-3 (hardest last) when available,
 * no object repeats within a round, honoring a caller-owned session
 * "seen" set that resets when the pool is exhausted.
 */
export function selectDescriptions(pack, config, rand, seenIds) {
  const byId = new Map(pack.objects.map((o) => [o.id, o]));
  const all = shuffle(pack.descriptions, rand);

  const pickPool = (pool, composition) => {
    const picked = [];
    const usedObjects = new Set();
    for (const diff of composition) {
      const d = pool.find(
        (x) => byId.get(x.objectId).difficulty === diff && !usedObjects.has(x.objectId)
      );
      if (d) {
        picked.push(d);
        usedObjects.add(d.objectId);
      }
    }
    // top up with anything if composition couldn't be met
    for (const d of pool) {
      if (picked.length >= composition.length) break;
      if (!picked.includes(d) && !usedObjects.has(d.objectId)) {
        picked.push(d);
        usedObjects.add(d.objectId);
      }
    }
    return picked;
  };

  const composition = compositionFor(config.descriptionsPerRound);
  let pool = all.filter((d) => !seenIds.has(descKey(d)));
  let picked = pickPool(pool, composition);
  if (picked.length < composition.length) {
    // pool exhausted: reset seen and refill from everything
    seenIds.clear();
    picked = pickPool(all, composition);
  }
  for (const d of picked) seenIds.add(descKey(d));
  // order easy → hard so the hardest lands last
  picked.sort((a, b) => byId.get(a.objectId).difficulty - byId.get(b.objectId).difficulty);
  return picked;
}

function descKey(d) {
  return d.objectId + '::' + d.text.slice(0, 40);
}

/** A difficulty list of length `n` holding the 2:2:1 easy/medium/hard ratio
 *  (e.g. 5 → [1,1,2,2,3], 10 → [1,1,1,1,2,2,2,2,3,3]). Hardest-last ordering
 *  is applied later by the caller's sort. */
export function compositionFor(n) {
  const c1 = Math.round((n * 2) / 5);
  const c2 = Math.round((n * 2) / 5);
  const c3 = Math.max(0, n - c1 - c2);
  return [
    ...Array(c1).fill(1),
    ...Array(c2).fill(2),
    ...Array(c3).fill(3),
  ];
}

function splitWords(text) {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

export function rankFor(total, config) {
  const [wizard, quick, good] = config.rankThresholds;
  if (total >= wizard) return 'Word Wizard';
  if (total >= quick) return 'Quick Head';
  if (total >= good) return 'Good Guesser';
  return 'Keep Trying';
}

export function createGuessRound({ pack, config, rand, seenIds = new Set() }) {
  const byId = new Map(pack.objects.map((o) => [o.id, o]));
  const descs = selectDescriptions(pack, config, rand, seenIds);

  const items = descs.map((d) => ({
    desc: d,
    object: byId.get(d.objectId),
    words: splitWords(d.text),
    value: config.startValue,
    revealedWords: 0,
    wrongGuesses: [],
    status: 'playing', // 'playing' | 'won' | 'lost' | 'gaveup'
    banked: 0,
  }));
  for (const it of items) {
    it.revealedWords = Math.min(config.revealChunkWords, it.words.length);
  }

  let index = 0;
  let roundScore = 0;
  let finished = false;

  const current = () => items[index];

  const api = {
    get state() {
      const it = current();
      return {
        index,
        total: items.length,
        roundScore,
        finished,
        item: it && {
          object: it.object,
          words: it.words,
          value: it.value,
          revealedWords: it.revealedWords,
          wrongGuesses: it.wrongGuesses.slice(),
          status: it.status,
          banked: it.banked,
          fullyRevealed: it.revealedWords >= it.words.length,
        },
        rank: finished ? rankFor(roundScore, config) : null,
        results: items.map((it2) => ({
          object: it2.object,
          status: it2.status,
          banked: it2.banked,
          text: it2.desc.text,
        })),
      };
    },

    reveal() {
      const it = current();
      if (!it || it.status !== 'playing') return false;
      if (it.revealedWords >= it.words.length) return false;
      it.value = Math.max(0, it.value - config.revealCost);
      it.revealedWords = Math.min(it.words.length, it.revealedWords + config.revealChunkWords);
      return true;
    },

    guess(text) {
      const it = current();
      if (!it || it.status !== 'playing') return 'inactive';
      const norm = normalize(text);
      if (norm === '') return 'empty';
      if (it.wrongGuesses.some((g) => normalize(g) === norm)) return 'duplicate';
      const answers = [it.object.name, ...(it.object.aliases || [])];
      if (matches(text, answers)) {
        it.status = 'won';
        it.banked = Math.max(0, it.value);
        roundScore += it.banked;
        return 'correct';
      }
      it.wrongGuesses.push(text);
      it.value = Math.max(0, it.value - config.wrongGuessCost);
      if (it.wrongGuesses.length >= config.maxWrongGuesses) {
        it.status = 'lost';
        it.value = 0;
        return 'failed'; // third wrong guess ends the description
      }
      return 'wrong';
    },

    giveUp() {
      const it = current();
      if (!it || it.status !== 'playing') return false;
      it.status = 'gaveup';
      it.value = 0;
      return true;
    },

    next() {
      const it = current();
      if (!it || it.status === 'playing') return false;
      if (index + 1 >= items.length) {
        finished = true;
        return false;
      }
      index++;
      return true;
    },
  };

  return api;
}
