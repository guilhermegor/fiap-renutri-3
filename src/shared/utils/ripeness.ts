/**
 * Ripeness — the five-stop scale that powers the entire app.
 *
 * Lives in shared/ rather than per-capability so that both the pantry
 * and the recipe-suggestions capabilities can reference the same type.
 * The boundaries rules forbid shared/ from depending on any
 * capability's domain/, so the type necessarily belongs here.
 *
 * pt-BR vernacular labels come from the brand doc:
 *   fresh    → verdinho
 *   peak     → maduro
 *   aging    → atenção
 *   critical → use já
 *   spoiled  → estragado
 *
 * Thresholds are absolute days-to-expiry per brand_design/renutri.md §6.
 * Per-category thresholds (milk vs hard cheese) are flagged in the
 * brand doc appendix as future work — deliberately out of scope here.
 */

import { differenceInCalendarDays } from 'date-fns';

export enum Ripeness {
  Fresh = 'fresh',
  Peak = 'peak',
  Aging = 'aging',
  Critical = 'critical',
  Spoiled = 'spoiled',
}

/**
 * Compute the ripeness state of a tracked food item from its expiry
 * date and the current moment. Returns one of the five enum stops.
 *
 * Rules (brand doc §6, "Ripeness-to-Days Mapping"):
 *   fresh    → more than 7 days to expiry
 *   peak     → 4–7 days to expiry (inclusive)
 *   aging    → 2–3 days to expiry (inclusive)
 *   critical → today or tomorrow
 *   spoiled  → past expiry
 *
 * Uses date-fns `differenceInCalendarDays` so timezone-adjacent
 * "1 hour to midnight" cases don't flip an item from `peak` to `aging`
 * mid-evening — we compare calendar days, not 24-hour windows.
 */
export function computeRipeness(expiresAt: Date, now: Date): Ripeness {
  const days = differenceInCalendarDays(expiresAt, now);
  if (days < 0) return Ripeness.Spoiled;
  if (days <= 1) return Ripeness.Critical;
  if (days <= 3) return Ripeness.Aging;
  if (days <= 7) return Ripeness.Peak;
  return Ripeness.Fresh;
}

/**
 * Urgency score per ripeness state — used by the recipe-suggestions
 * capability to rank recipes that consume at-risk items first. A
 * recipe using three `critical` items outranks one using a single
 * `aging` item; `spoiled` items hurt because the recipe would call
 * for something inedible.
 *
 * Lives here (next to the enum) so both capabilities and routes can
 * import the same scale without cross-boundary plumbing.
 */
export const RIPENESS_URGENCY_SCORE: Record<Ripeness, number> = {
  [Ripeness.Fresh]: 0.5,
  [Ripeness.Peak]: 1,
  [Ripeness.Aging]: 2,
  [Ripeness.Critical]: 4,
  [Ripeness.Spoiled]: -1,
};
