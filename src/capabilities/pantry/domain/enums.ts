/**
 * Food categories that the user can assign to a pantry item.
 *
 * Values are stable strings so the localStorage schema stays
 * human-readable and forward-compatible across versions. pt-BR
 * display labels live in strings.pt-BR.ts at the capability root.
 */

export enum FoodCategory {
  Vegetable = 'vegetable',
  Fruit = 'fruit',
  Dairy = 'dairy',
  Protein = 'protein',
  Grain = 'grain',
  PantryStaple = 'pantry-staple',
  Beverage = 'beverage',
  Other = 'other',
}
