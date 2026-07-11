// Pass-and-play state machine (design §4 pass-and-play loop). Pure.
//
// A round is `passPlayLegs` legs. In each leg one player writes a description
// of an assigned object (standard write rules), the device is handed over,
// and the other player guesses it (standard guess rules on the written text).
// Both score off how guessable-yet-short the writing was:
//   guesser: the banked meter value (0 if lost / gave up)
//   writer:  the banked value + the star bonus for brevity (0 if not guessed)
// Roles swap every leg.

import { shuffle } from './rng.js';
import { forbiddenWordsFor, starsFor, evaluateText } from './game-write.js';
import { createGuessRound } from './game-guess.js';

function pickObjects(pack, legs, rand, seenIds) {
  const all = shuffle(pack.objects, rand);
  const prefer = Array.from({ length: legs }, (_, i) => (i % 2) + 1); // gentle 1,2,1,2…
  const pickFrom = (pool) => {
    const picked = [];
    for (const diff of prefer) {
      const o = pool.find((x) => x.difficulty === diff && !picked.includes(x));
      if (o) picked.push(o);
    }
    for (const o of pool) {
      if (picked.length >= legs) break;
      if (!picked.includes(o)) picked.push(o);
    }
    return picked;
  };
  let picked = pickFrom(all.filter((o) => !seenIds.has(o.id)));
  if (picked.length < legs) {
    seenIds.clear();
    picked = pickFrom(all);
  }
  for (const o of picked) seenIds.add(o.id);
  return picked;
}

export function createPassPlayRound({ pack, config, rand, wordSet, seenIds = new Set() }) {
  const legs = config.passPlayLegs;
  const objects = pickObjects(pack, legs, rand, seenIds);

  let leg = 0;
  let phase = 'write'; // 'write' | 'guess' | 'legEnd' | 'done'
  let finished = false;
  const scores = [0, 0];
  const legResults = [];
  let draft = null;      // { text, stars, letterCount, starBonus }
  let guessRound = null; // inner single-description guess round

  const writerIndex = () => leg % 2;
  const guesserIndex = () => 1 - writerIndex();
  const object = () => objects[leg];
  const forbidden = () => forbiddenWordsFor(object());

  function resolveLeg(status) {
    const it = guessRound.state.item;
    const banked = status === 'won' ? it.banked : 0;
    const guesserPoints = banked;
    const writerPoints = status === 'won' ? banked + draft.starBonus : 0;
    scores[guesserIndex()] += guesserPoints;
    scores[writerIndex()] += writerPoints;
    legResults.push({
      object: object(),
      writerIndex: writerIndex(),
      guesserIndex: guesserIndex(),
      status,
      text: draft.text,
      stars: draft.stars,
      letterCount: draft.letterCount,
      banked,
      writerPoints,
      guesserPoints,
    });
    phase = 'legEnd';
  }

  const api = {
    get state() {
      return {
        leg,
        legs,
        phase,
        finished,
        writerIndex: writerIndex(),
        guesserIndex: guesserIndex(),
        object: leg < legs ? object() : null,
        scores: scores.slice(),
        legResults: legResults.slice(),
        draftStars: draft ? draft.stars : null,
        guess: guessRound ? guessRound.state.item : null,
      };
    },

    /** Write-phase live check (same rules as solo write mode). */
    evaluate(text) {
      return evaluateText(text, wordSet, config, forbidden());
    },

    submitWrite(text) {
      if (phase !== 'write') return null;
      const ev = api.evaluate(text);
      if (!ev.canSubmit) return null;
      const letterCount = ev.checkResult.letterCount;
      const stars = starsFor(letterCount, object().parLetters, config);
      draft = { text, stars, letterCount, starBonus: config.starPoints[3 - stars] };
      guessRound = createGuessRound({
        pack: { objects: [object()], descriptions: [{ objectId: object().id, text }] },
        config: { ...config, descriptionsPerRound: 1 },
        rand,
      });
      phase = 'guess';
      return { stars, letterCount };
    },

    /** Writer bails on the object: leg scores 0 for both. */
    skipWrite() {
      if (phase !== 'write') return false;
      legResults.push({
        object: object(),
        writerIndex: writerIndex(),
        guesserIndex: guesserIndex(),
        status: 'skipped',
        text: '', stars: 0, letterCount: 0,
        banked: 0, writerPoints: 0, guesserPoints: 0,
      });
      phase = 'legEnd';
      return true;
    },

    // --- guess phase, delegated to the standard guess machine ---

    reveal() {
      if (phase !== 'guess') return false;
      return guessRound.reveal();
    },

    guessAnswer(text) {
      if (phase !== 'guess') return 'inactive';
      const r = guessRound.guess(text);
      if (r === 'correct') resolveLeg('won');
      else if (r === 'failed') resolveLeg('lost');
      return r;
    },

    giveUp() {
      if (phase !== 'guess') return false;
      guessRound.giveUp();
      resolveLeg('gaveup');
      return true;
    },

    nextLeg() {
      if (phase !== 'legEnd') return false;
      if (leg + 1 >= legs) {
        finished = true;
        phase = 'done';
        return false;
      }
      leg++;
      phase = 'write';
      draft = null;
      guessRound = null;
      return true;
    },
  };

  return api;
}
