// Timed-round state machine (a variant of guess mode). Pure: no DOM, no timers.
//
// The first `revealChunkWords` words are shown at the start, exactly like guess
// mode. From there the caller drives tick() on a clock: each tick reveals one
// more LETTER of the description and drains points. There is no "show more" —
// information arrives with time, and time costs points. When the value hits
// zero the description is lost (0 points) and the answer is revealed.
//
// The 200ms interval and the drain rate are UI/config concerns; this module
// only exposes tick() so node --test can assert the reveal-and-drain math.

import { selectDescriptions, rankFor } from './game-guess.js';
import { matches, normalize } from './match.js';

/** Character index (exclusive) up to which the first `n` whitespace-words show. */
export function charIndexAfterWords(text, n) {
  let count = 0;
  let i = 0;
  const len = text.length;
  while (i < len) {
    while (i < len && /\s/.test(text[i])) i++;      // skip spaces
    const wordStart = i;
    while (i < len && !/\s/.test(text[i])) i++;      // consume a word
    if (i > wordStart) {
      count++;
      if (count === n) return i;
    }
  }
  return len;
}

export function createTimedRound({ pack, config, rand, seenIds = new Set() }) {
  const byId = new Map(pack.objects.map((o) => [o.id, o]));
  const descs = selectDescriptions(pack, config, rand, seenIds);

  const items = descs.map((d) => ({
    desc: d,
    object: byId.get(d.objectId),
    text: d.text,
    value: config.timedStartValue,
    revealedChars: charIndexAfterWords(d.text, config.revealChunkWords),
    wrongGuesses: [],
    status: 'playing', // 'playing' | 'won' | 'lost' | 'gaveup'
    banked: 0,
  }));

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
          text: it.text,
          value: it.value,
          revealedChars: it.revealedChars,
          wrongGuesses: it.wrongGuesses.slice(),
          status: it.status,
          banked: it.banked,
          fullyRevealed: it.revealedChars >= it.text.length,
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

    /** One clock tick: reveal a letter, drain points. Returns 'timeout' if the
     *  value just hit zero (description lost), 'tick' otherwise. */
    tick() {
      const it = current();
      if (!it || it.status !== 'playing') return 'inactive';
      if (it.revealedChars < it.text.length) it.revealedChars++;
      it.value = Math.max(0, it.value - config.timedDrainPerTick);
      if (it.value === 0) {
        it.status = 'lost';
        return 'timeout';
      }
      return 'tick';
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
      if (it.value === 0 || it.wrongGuesses.length >= config.maxWrongGuesses) {
        it.status = 'lost';
        it.value = 0;
        return 'failed';
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
