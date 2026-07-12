// Silent, fire-and-forget Google Form submission for anonymous stats and
// description collection. Every call is fully guarded: a network failure,
// blocked request, or misconfiguration must NEVER affect gameplay.
//
// Google Forms accept a cross-origin POST to their /formResponse endpoint with
// `entry.NNN=value` form fields. The response is opaque (no-cors) — we never
// read it — but the submission is recorded.

/** A form's /viewform URL → its /formResponse endpoint. */
export function toResponseUrl(viewformUrl) {
  return viewformUrl ? viewformUrl.replace(/\/viewform.*$/, '/formResponse') : '';
}

/** POST `fields` to a Google Form in the background. Returns nothing, throws nothing. */
export function postForm(viewformUrl, fields) {
  try {
    const url = toResponseUrl(viewformUrl);
    if (!url) return;
    const body = new URLSearchParams();
    for (const [k, v] of Object.entries(fields)) {
      if (k && v != null && v !== '') body.set(k, String(v));
    }
    if (![...body.keys()].length) return;
    // opaque, unawaited, errors swallowed — cannot disturb the game
    fetch(url, { method: 'POST', mode: 'no-cors', body, keepalive: true }).catch(() => {});
  } catch { /* stats must never break gameplay */ }
}

/** Silently record an incorrect guess (config.statsForm). */
export function reportWrongGuess(config, { thing, description, guess }) {
  const f = config && config.statsForm;
  if (!f || !f.viewformUrl) return;
  postForm(f.viewformUrl, {
    [f.thingEntry]: thing,
    [f.descEntry]: description,
    [f.guessEntry]: guess,
  });
}

/** Silently submit a player-written description (config.submitForm). */
export function submitDescription(config, { thing, text }) {
  const f = config && config.submitForm;
  if (!f || !f.viewformUrl) return false;
  postForm(f.viewformUrl, {
    [f.thingEntry]: thing,
    [f.textEntry]: text,
  });
  return true;
}
