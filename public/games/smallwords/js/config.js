// The only tuning surface (design §12).

export const VERSION = '0.1.0';

export const CONFIG = {
  vocabSize: 1000,          // how many top-ranked words are legal
  descriptionsPerRound: 10, // guess/timed round length
  revealChunkWords: 8,      // words shown initially and per reveal
  startValue: 100,          // value of each description at start
  revealCost: 10,           // cost of Show more
  wrongGuessCost: 15,       // cost of a wrong guess
  maxWrongGuesses: 3,       // wrong guesses before auto-fail
  writeObjectsPerRound: 3,  // write round length
  minWriteWords: 10,        // minimum words to submit
  parStar2Multiplier: 1.5,  // 2-star letter threshold vs par
  checkDebounceMs: 150,     // live checker debounce
  answerRevealMs: 2500,     // auto-advance delay after correct guess
  illegalBlipThrottleMs: 1000, // min gap between illegal-word blips
  rankThresholds: [800, 600, 400], // guess-round rank cutoffs (80/60/40% of max)
  starPoints: [100, 60, 30],       // points for 3/2/1 stars
  passPlayLegs: 2,                 // pass-and-play: each leg = one write + one guess, roles swap
  timedTickMs: 200,                // timed mode: reveal one more letter this often
  timedStartValue: 100,            // timed mode: starting points per description
  timedDrainPerTick: 1,            // timed mode: points lost each tick (100 → 0 in 20s)
};
