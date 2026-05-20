/**
 * Recipe repository backed by the bundled corpus constant.
 *
 * The corpus ships with the build (no network, no API) so the demo is
 * deterministic for FIAP grading and works offline. Wrapped in a
 * Promise to satisfy the async port contract — if the corpus ever
 * moves to a fetched static asset, only this adapter changes.
 */

import { RECIPES_PT_BR } from '../data/recipes';
import { RecipeDTO } from '../domain/dto';
import { IRecipeRepository } from '../domain/ports';

export class LocalRecipeRepository implements IRecipeRepository {
  async findAll(): Promise<RecipeDTO[]> {
    return RECIPES_PT_BR;
  }
}
