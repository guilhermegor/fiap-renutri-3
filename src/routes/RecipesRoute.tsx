/**
 * Cross-capability composer.
 *
 * This is the ONE place allowed to wire two capabilities together —
 * the eslint boundaries rule lets `routes` import from capability
 * barrels, while it forbids a capability's composition-root from
 * importing another capability's barrel. So the pantry→recipes data
 * flow lives here, not inside RecipeSuggestionsProvider.
 *
 * Flow: read pantry items → score each by ripeness urgency →
 * feed the scored inputs to the recipe suggester → render the page
 * with the ranked suggestions and the set of urgent ingredient names.
 */

import { useEffect, useMemo } from 'react';

import { usePantryContext } from '@/capabilities/pantry';
import {
  PantryMatchInput,
  RecipesPage,
  useRecipeSuggestionsContext,
} from '@/capabilities/recipe-suggestions';
import { Ripeness, RIPENESS_URGENCY_SCORE, computeRipeness } from '@/shared/utils/ripeness';

export function RecipesRoute() {
  const { items } = usePantryContext();
  const { suggestions, suggest } = useRecipeSuggestionsContext();

  const now = useMemo(() => new Date(), []);

  const pantryInputs = useMemo<PantryMatchInput[]>(
    () =>
      items.map((item) => ({
        name: item.name,
        ripenessScore: RIPENESS_URGENCY_SCORE[computeRipeness(item.expiresAt, now)],
      })),
    [items, now],
  );

  const urgentIngredientNames = useMemo(
    () =>
      items
        .filter((item) => {
          const ripeness = computeRipeness(item.expiresAt, now);
          return ripeness === Ripeness.Critical || ripeness === Ripeness.Aging;
        })
        .map((item) => item.name),
    [items, now],
  );

  useEffect(() => {
    suggest(pantryInputs);
  }, [suggest, pantryInputs]);

  return (
    <RecipesPage suggestions={suggestions} urgentIngredientNames={urgentIngredientNames} />
  );
}
