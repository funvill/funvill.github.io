// Endless / survival state machine. Pure: no DOM, no timers.
//
// Deals guess-mode puzzles one after another forever. Each correct answer adds
// to your solved count and banks points; each miss (a failed or given-up
// puzzle) costs a life. When `endlessLives` lives are gone, the game ends.

import { shuffle } from './rng.js';
import { matches, normalize } from './match.js';

function splitWords(text) {
  return text.split(/\s+/).filter((w) => w.length > 0);
}
function descKey(d) {
  return d.objectId + '::' + d.text.slice(0, 40);
}

export function createEndlessRound({ pack, config, rand, seenIds = new Set() }) {
  const byId = new Map(pack.objects.map((o) => [o.id, o]));
  let queue = [];

  function refill() {
    queue = shuffle(pack.descriptions, rand).filter((d) => !seenIds.has(descKey(d)));
    if (queue.length === 0) {
      seenIds.clear();
      queue = shuffle(pack.descriptions, rand);
    }
  }

  let lives = config.endlessLives;
  let solved = 0;
  let totalScore = 0;
  let gameOver = false;
  let current = null;
  const results = [];

  function deal() {
    if (!queue.length) refill();
    const d = queue.shift();
    seenIds.add(descKey(d));
    const words = splitWords(d.text);
    current = {
      desc: d,
      object: byId.get(d.objectId),
      words,
      value: config.startValue,
      revealedWords: Math.min(config.revealChunkWords, words.length),
      wrongGuesses: [],
      status: 'playing', // 'playing' | 'won' | 'lost' | 'gaveup'
      banked: 0,
    };
  }

  function loseLife() {
    lives = Math.max(0, lives - 1);
    results.push({ object: current.object, status: current.status, banked: 0 });
  }

  deal();

  return {
    get state() {
      return {
        lives,
        maxLives: config.endlessLives,
        solved,
        totalScore,
        gameOver,
        item: current && {
          object: current.object,
          words: current.words,
          value: current.value,
          revealedWords: current.revealedWords,
          wrongGuesses: current.wrongGuesses.slice(),
          status: current.status,
          banked: current.banked,
          fullyRevealed: current.revealedWords >= current.words.length,
        },
        results: results.slice(),
      };
    },

    reveal() {
      const it = current;
      if (!it || it.status !== 'playing') return false;
      if (it.revealedWords >= it.words.length) return false;
      it.value = Math.max(0, it.value - config.revealCost);
      it.revealedWords = Math.min(it.words.length, it.revealedWords + config.revealChunkWords);
      return true;
    },

    guess(text) {
      const it = current;
      if (!it || it.status !== 'playing') return 'inactive';
      const norm = normalize(text);
      if (norm === '') return 'empty';
      if (it.wrongGuesses.some((g) => normalize(g) === norm)) return 'duplicate';
      const answers = [it.object.name, ...(it.object.aliases || [])];
      if (matches(text, answers)) {
        it.status = 'won';
        it.banked = Math.max(0, it.value);
        totalScore += it.banked;
        solved++;
        results.push({ object: it.object, status: 'won', banked: it.banked });
        return 'correct';
      }
      it.wrongGuesses.push(text);
      it.value = Math.max(0, it.value - config.wrongGuessCost);
      // a wrong guess also uncovers more of the description — you paid points,
      // so you might as well get a bigger clue.
      if (it.revealedWords < it.words.length) {
        it.revealedWords = Math.min(it.words.length, it.revealedWords + config.revealChunkWords);
      }
      if (it.wrongGuesses.length >= config.maxWrongGuesses) {
        it.status = 'lost';
        it.value = 0;
        loseLife();
        return 'failed';
      }
      return 'wrong';
    },

    giveUp() {
      const it = current;
      if (!it || it.status !== 'playing') return false;
      it.status = 'gaveup';
      it.value = 0;
      loseLife();
      return true;
    },

    /** Advance to the next puzzle, or end the game if out of lives. */
    next() {
      if (gameOver) return false;
      if (current && current.status === 'playing') return false;
      if (lives <= 0) {
        gameOver = true;
        return false;
      }
      deal();
      return true;
    },
  };
}
