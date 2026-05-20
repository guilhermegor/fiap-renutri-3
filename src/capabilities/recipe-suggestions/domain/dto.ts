import { CuisineCategory } from './enums';

export interface IngredientDTO {
  /** Canonical pt-BR name, e.g. "Tomate". */
  name: string;
  /** Optional alternative names for fuzzy matching, e.g. ["tomate italiano", "tomate cereja"]. */
  aliases?: string[];
  /** Human-readable amount, e.g. "200g" or "2 unidades". */
  amount: string;
  /** Marks ingredients that aren't strictly required. */
  optional?: boolean;
}

export interface RecipeDTO {
  id: string;
  title: string;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  category: CuisineCategory;
  ingredients: IngredientDTO[];
  steps: string[];
}

/**
 * Pre-computed input for the suggestion scorer. The route (which CAN
 * import from both pantry/ and shared/) maps each pantry item to one
 * of these — pre-computing the ripeness score keeps recipe-
 * suggestions/application boundary-clean (no import from pantry's
 * domain or shared/).
 */
export interface PantryMatchInput {
  name: string;
  ripenessScore: number;
}

export interface RecipeMatchDTO {
  recipe: RecipeDTO;
  score: number;
  matchedIngredients: string[];
}
