// Write-round state machine (design §4, §7). Pure: no DOM, no fetch.

import { shuffle } from './rng.js';
import { check } from './checker.js';

/** Words of 4+ letters from the object's name and aliases (anti-cheese set). */
export function forbiddenWordsFor(object) {
  const words = new Set();
  const sources = [object.name, ...(object.aliases || [])];
  for (const s of sources) {
    for (const w of s.toLowerCase().split(/[^a-z]+/)) {
      if (w.length >= 4) words.add(w);
    }
  }
  return words;
}

/** Pick one object per difficulty 1, 2, 3 (escalating), honoring seen set. */
export function selectObjects(pack, config, rand, seenIds) {
  const all = shuffle(pack.objects, rand);
  const pick = (pool) => {
    const picked = [];
    for (const diff of [1, 2, 3].slice(0, config.writeObjectsPerRound)) {
      const o = pool.find((x) => x.difficulty === diff && !picked.includes(x));
      if (o) picked.push(o);
    }
    for (const o of pool) {
      if (picked.length >= config.writeObjectsPerRound) break;
      if (!picked.includes(o)) picked.push(o);
    }
    return picked;
  };
  let pool = all.filter((o) => !seenIds.has(o.id));
  let picked = pick(pool);
  if (picked.length < config.writeObjectsPerRound) {
    seenIds.clear();
    picked = pick(all);
  }
  for (const o of picked) seenIds.add(o.id);
  picked.sort((a, b) => a.difficulty - b.difficulty);
  return picked;
}

export function starsFor(letterCount, parLetters, config) {
  if (letterCount <= parLetters) return 3;
  if (letterCount <= parLetters * config.parStar2Multiplier) return 2;
  return 1;
}

/** Live evaluation of a write-mode draft against one target object. */
export function evaluateText(text, wordSet, config, forbidden) {
  const result = check(text, wordSet, { forbidden });
  let blockReason = null;
  if (result.illegalCount > 0) {
    blockReason = result.illegalCount === 1 ? '1 hard word left' : `${result.illegalCount} hard words left`;
  } else if (result.forbiddenCount > 0) {
    blockReason = 'You used the name of the thing';
  } else if (result.wordCount < config.minWriteWords) {
    blockReason = `Use at least ${config.minWriteWords} words`;
  }
  return { checkResult: result, canSubmit: blockReason === null, blockReason };
}

export function createWriteRound({ pack, config, rand, wordSet, seenIds = new Set() }) {
  const objects = selectObjects(pack, config, rand, seenIds);
  const items = objects.map((o) => ({
    object: o,
    forbidden: forbiddenWordsFor(o),
    status: 'writing', // 'writing' | 'submitted' | 'skipped'
    text: '',
    letterCount: 0,
    stars: 0,
    points: 0,
  }));

  let index = 0;
  let finished = false;

  const current = () => items[index];

  const api = {
    get state() {
      const it = current();
      return {
        index,
        total: items.length,
        finished,
        item: it && {
          object: it.object,
          status: it.status,
          stars: it.stars,
          points: it.points,
          letterCount: it.letterCount,
        },
        totalPoints: items.reduce((s, x) => s + x.points, 0),
        totalStars: items.reduce((s, x) => s + x.stars, 0),
        results: items.map((x) => ({
          object: x.object,
          status: x.status,
          text: x.text,
          letterCount: x.letterCount,
          stars: x.stars,
          points: x.points,
        })),
      };
    },

    /** Live evaluation of a draft. Never mutates round state. */
    evaluate(text) {
      return evaluateText(text, wordSet, config, current().forbidden);
    },

    submit(text) {
      const it = current();
      if (!it || it.status !== 'writing') return null;
      const ev = api.evaluate(text);
      if (!ev.canSubmit) return null;
      it.status = 'submitted';
      it.text = text;
      it.letterCount = ev.checkResult.letterCount;
      it.stars = starsFor(it.letterCount, it.object.parLetters, config);
      it.points = config.starPoints[3 - it.stars];
      return { stars: it.stars, points: it.points, letterCount: it.letterCount };
    },

    skip() {
      const it = current();
      if (!it || it.status !== 'writing') return false;
      it.status = 'skipped';
      return true;
    },

    next() {
      const it = current();
      if (!it || it.status === 'writing') return false;
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
