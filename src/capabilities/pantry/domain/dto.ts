/**
 * Boundary types for the pantry capability.
 *
 * DTOs use ISO-8601 strings for dates so they JSON-serialise cleanly
 * to localStorage. The factories layer converts to/from Date objects
 * at the boundary between infrastructure and the rest of the app.
 */

import { FoodCategory } from './enums';

export interface PantryItemCreateDTO {
  name: string;
  category: FoodCategory;
  expiresAt: string;
  shelfLifeDays: number;
}

export interface PantryItemResponseDTO {
  id: string;
  name: string;
  category: FoodCategory;
  storedAt: string;
  expiresAt: string;
  shelfLifeDays: number;
}
