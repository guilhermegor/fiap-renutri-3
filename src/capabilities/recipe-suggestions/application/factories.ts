/**
 * Suggestion scoring.
 *
 * Given a recipe corpus and an array of pre-scored pantry items, rank
 * the recipes by total urgency score and return the top matches.
 *
 * The "pre-scored" input keeps this layer boundary-clean: we don't
 * import from pantry's domain or from shared/utils/ripeness here.
 */

import { IngredientDTO, PantryMatchInput, RecipeDTO, RecipeMatchDTO } from '../domain/dto';

function ingredientMatchesItem(ingredient: IngredientDTO, itemName: string): boolean {
  const itemLower = itemName.toLowerCase();
  const candidates = [ingredient.name, ...(ingredient.aliases ?? [])].map((s) =>
    s.toLowerCase(),
  );
  return candidates.some(
    (candidate) => itemLower.includes(candidate) || candidate.includes(itemLower),
  );
}

export function scoreRecipe(
  recipe: RecipeDTO,
  pantryInputs: PantryMatchInput[],
): RecipeMatchDTO {
  const matched: string[] = [];
  let score = 0;

  for (const ingredient of recipe.ingredients) {
    if (ingredient.optional) continue;
    const hit = pantryInputs.find((input) => ingredientMatchesItem(ingredient, input.name));
    if (hit) {
      matched.push(ingredient.name);
      score += hit.ripenessScore;
    }
  }

  return { recipe, score, matchedIngredients: matched };
}

export function rankRecipes(
  recipes: RecipeDTO[],
  pantryInputs: PantryMatchInput[],
): RecipeMatchDTO[] {
  return recipes
    .map((recipe) => scoreRecipe(recipe, pantryInputs))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * All recipes whose (non-optional) ingredients include a single named
 * pantry item. Used by the per-item drill-down: tap a pantry card to
 * see what you can cook with that specific ingredient.
 */
export function recipesForIngredient(recipes: RecipeDTO[], itemName: string): RecipeDTO[] {
  return recipes.filter((recipe) =>
    recipe.ingredients.some(
      (ingredient) => !ingredient.optional && ingredientMatchesItem(ingredient, itemName),
    ),
  );
}
