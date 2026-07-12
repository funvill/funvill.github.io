// The only tuning surface (design §12).

export const VERSION = '0.2.0';

export const CONFIG = {
  vocabSize: 1000,          // how many top-ranked words are legal
  descriptionsPerRound: 10, // guess/timed round length
  revealChunkWords: 8,      // words shown initially and per reveal
  startValue: 100,          // value of each description at start
  revealCost: 10,           // cost of Show more
  wrongGuessCost: 15,       // cost of a wrong guess
  maxWrongGuesses: 3,       // wrong guesses before auto-fail
  writeObjectsPerRound: 3,  // write round length
  minWriteWords: 1,         // minimum words to submit (just not empty)
  submitEmail: '',          // if set, "Submit a Description" offers an email button to send it here
  parStar2Multiplier: 1.5,  // 2-star letter threshold vs par
  checkDebounceMs: 150,     // live checker debounce
  answerRevealMs: 2500,     // auto-advance delay after correct guess
  illegalBlipThrottleMs: 1000, // min gap between illegal-word blips
  rankThresholds: [800, 600, 400], // guess-round rank cutoffs (80/60/40% of max)
  starPoints: [100, 60, 30],       // points for 3/2/1 stars
  passPlayLegs: 2,                 // pass-and-play: each leg = one write + one guess, roles swap
  endlessLives: 3,                 // endless mode: misses (fails/give-ups) before game over
  dailyPuzzleCount: 5,             // daily puzzle: number of things, same for everyone that day
  // Anonymous Google Form for "Submit a Description" (optional). Create a form
  // with two short-answer questions (the thing, the description), take its
  // pre-filled-link, and paste the viewform URL + the two entry.NNN field ids.
  submitForm: { viewformUrl: '', thingEntry: '', textEntry: '' },
  timedTickMs: 200,                // timed mode: reveal one more letter this often
  timedStartValue: 100,            // timed mode: starting points per description
  timedDrainPerTick: 1,            // timed mode: points lost each tick (100 → 0 in 20s)
};
