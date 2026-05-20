/**
 * A tracked food item in the user's pantry.
 *
 * Ripeness is intentionally NOT a field on this entity — it's a
 * derived property computed at render time from expiresAt + now via
 * shared/utils/ripeness.computeRipeness. Storing ripeness would mean
 * stale data the moment the calendar ticks past midnight.
 */

import { FoodCategory } from './enums';

export interface PantryItem {
  id: string;
  name: string;
  category: FoodCategory;
  storedAt: Date;
  expiresAt: Date;
  shelfLifeDays: number;
}
