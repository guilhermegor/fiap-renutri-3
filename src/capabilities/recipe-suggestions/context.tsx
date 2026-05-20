import { ReactNode, useCallback, useMemo } from 'react';

import { recipesForIngredient } from './application/factories';
import { useLoadRecipes, useSuggestRecipes } from './application/use-cases';
import { LocalRecipeRepository } from './infrastructure/local-recipe-repository';
import {
  RecipeSuggestionsContext,
  RecipeSuggestionsContextValue,
} from './use-context';

interface RecipeSuggestionsProviderProps {
  children: ReactNode;
}

export function RecipeSuggestionsProvider({ children }: RecipeSuggestionsProviderProps) {
  const repo = useMemo(() => new LocalRecipeRepository(), []);
  const { recipes, loading } = useLoadRecipes(repo);
  const { suggestions, suggest } = useSuggestRecipes(recipes);

  const findRecipesForIngredient = useCallback(
    (itemName: string) => recipesForIngredient(recipes, itemName),
    [recipes],
  );

  const value = useMemo<RecipeSuggestionsContextValue>(
    () => ({ recipes, suggestions, loading, suggest, findRecipesForIngredient }),
    [recipes, suggestions, loading, suggest, findRecipesForIngredient],
  );

  return (
    <RecipeSuggestionsContext.Provider value={value}>
      {children}
    </RecipeSuggestionsContext.Provider>
  );
}
