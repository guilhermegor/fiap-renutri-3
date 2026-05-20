import { useCallback, useEffect, useState } from 'react';

import { PantryMatchInput, RecipeDTO, RecipeMatchDTO } from '../domain/dto';
import { IRecipeRepository } from '../domain/ports';

import { rankRecipes } from './factories';

export function useLoadRecipes(repo: IRecipeRepository) {
  const [recipes, setRecipes] = useState<RecipeDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findAll();
      setRecipes(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [repo]);

  useEffect(() => {
    void load();
  }, [load]);

  return { recipes, loading, error, reload: load };
}

export function useSuggestRecipes(recipes: RecipeDTO[]) {
  const [suggestions, setSuggestions] = useState<RecipeMatchDTO[]>([]);

  const suggest = useCallback(
    (pantryInputs: PantryMatchInput[]): void => {
      setSuggestions(rankRecipes(recipes, pantryInputs));
    },
    [recipes],
  );

  return { suggestions, suggest };
}
