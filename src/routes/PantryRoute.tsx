/**
 * Cross-capability composer for the Despensa page.
 *
 * PantryPage (pantry capability) renders the inventory and emits an
 * onSelectItem callback when a card is tapped. This route — the only
 * layer allowed to import from two capability barrels — looks up the
 * recipes for that item via the recipe-suggestions context and opens
 * the ItemRecipesModal. The pantry capability stays unaware of recipes.
 */

import { useState } from 'react';

import { PantryItem, PantryPage } from '@/capabilities/pantry';
import { ItemRecipesModal, useRecipeSuggestionsContext } from '@/capabilities/recipe-suggestions';

export function PantryRoute() {
  const { findRecipesForIngredient } = useRecipeSuggestionsContext();
  const [selectedItem, setSelectedItem] = useState<PantryItem | null>(null);

  const recipes = selectedItem ? findRecipesForIngredient(selectedItem.name) : [];

  return (
    <>
      <PantryPage onSelectItem={setSelectedItem} />
      <ItemRecipesModal
        ingredientName={selectedItem ? selectedItem.name : null}
        recipes={recipes}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
