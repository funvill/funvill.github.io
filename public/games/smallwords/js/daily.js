// Daily Puzzle date + streak helpers. Pure — the caller passes today's date so
// there are no Date.now() calls here and everything is unit-testable.

/** Format a Date to a local YYYY-MM-DD key. */
export function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** The YYYY-MM-DD one day before a given YYYY-MM-DD (UTC math, deterministic). */
export function dayBefore(key) {
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() - 1);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(dt.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

/**
 * Advance a streak given today's key. Idempotent per day.
 * state: { current, best, lastDate }.
 */
export function updateStreak(state, today) {
  const s = state && typeof state === 'object' ? state : {};
  const cur = s.current || 0;
  const best = s.best || 0;
  const last = s.lastDate || null;
  if (last === today) {
    return { current: cur, best: Math.max(best, cur), lastDate: last };
  }
  const current = last === dayBefore(today) ? cur + 1 : 1;
  return { current, best: Math.max(best, current), lastDate: today };
}

/** A Wordle-style emoji grid from a guess round's per-item results. */
export function shareGrid(results) {
  return (results || [])
    .map((r) => (r.status === 'won' ? (r.banked >= 80 ? '🟩' : '🟨') : '⬛'))
    .join('');
}
