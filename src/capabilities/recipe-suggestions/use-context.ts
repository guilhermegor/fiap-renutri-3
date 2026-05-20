import { createContext, useContext } from 'react';

import { PantryMatchInput, RecipeDTO, RecipeMatchDTO } from './domain/dto';

export interface RecipeSuggestionsContextValue {
  recipes: RecipeDTO[];
  suggestions: RecipeMatchDTO[];
  loading: boolean;
  suggest: (pantryInputs: PantryMatchInput[]) => void;
  /** Recipes that use a single named ingredient — drives the per-item drill-down. */
  findRecipesForIngredient: (itemName: string) => RecipeDTO[];
}

export const RecipeSuggestionsContext =
  createContext<RecipeSuggestionsContextValue | null>(null);

export function useRecipeSuggestionsContext(): RecipeSuggestionsContextValue {
  const ctx = useContext(RecipeSuggestionsContext);
  if (!ctx) {
    throw new Error(
      'useRecipeSuggestionsContext must be used within RecipeSuggestionsProvider',
    );
  }
  return ctx;
}
