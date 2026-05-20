/**
 * Boundary tests for computeRipeness. The function is the single
 * source of truth for "what colour and word should this item show",
 * so every transition between states must be pinned down — getting
 * any of these wrong silently mislabels food in the user's pantry.
 */

import { addDays } from 'date-fns';

import { Ripeness, computeRipeness } from './ripeness';

const NOW = new Date('2026-05-20T12:00:00Z');

describe('computeRipeness', () => {
  it('returns Fresh when more than 7 days to expiry', () => {
    expect(computeRipeness(addDays(NOW, 8), NOW)).toBe(Ripeness.Fresh);
    expect(computeRipeness(addDays(NOW, 30), NOW)).toBe(Ripeness.Fresh);
  });

  it('returns Peak at the inclusive upper bound of 7 days', () => {
    expect(computeRipeness(addDays(NOW, 7), NOW)).toBe(Ripeness.Peak);
  });

  it('returns Peak at the inclusive lower bound of 4 days', () => {
    expect(computeRipeness(addDays(NOW, 4), NOW)).toBe(Ripeness.Peak);
  });

  it('returns Aging at the inclusive upper bound of 3 days', () => {
    expect(computeRipeness(addDays(NOW, 3), NOW)).toBe(Ripeness.Aging);
  });

  it('returns Aging at the inclusive lower bound of 2 days', () => {
    expect(computeRipeness(addDays(NOW, 2), NOW)).toBe(Ripeness.Aging);
  });

  it('returns Critical for tomorrow', () => {
    expect(computeRipeness(addDays(NOW, 1), NOW)).toBe(Ripeness.Critical);
  });

  it('returns Critical for today', () => {
    expect(computeRipeness(NOW, NOW)).toBe(Ripeness.Critical);
  });

  it('returns Spoiled for any past expiry date', () => {
    expect(computeRipeness(addDays(NOW, -1), NOW)).toBe(Ripeness.Spoiled);
    expect(computeRipeness(addDays(NOW, -30), NOW)).toBe(Ripeness.Spoiled);
  });

  it('uses calendar-day boundaries, not 24-hour windows', () => {
    // 1 hour before midnight — still "today" on the calendar
    const lateEvening = new Date('2026-05-20T23:00:00Z');
    const tomorrowMidday = new Date('2026-05-21T12:00:00Z');
    // 13-hour gap, but 1 calendar-day → critical (not aging)
    expect(computeRipeness(tomorrowMidday, lateEvening)).toBe(Ripeness.Critical);
  });
});
