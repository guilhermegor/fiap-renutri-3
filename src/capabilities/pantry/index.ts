/**
 * Public surface of the pantry capability.
 *
 * Other layers (routes, App) import from this barrel only — never
 * from internal paths. The eslint boundaries rule enforces this.
 */

export { PantryProvider } from './context';
export { usePantryContext } from './use-context';
export { PantryPage } from './ui/pages/PantryPage';
export type { PantryItem } from './domain/entities';
export type { PantryItemCreateDTO, PantryItemResponseDTO } from './domain/dto';
export { FoodCategory } from './domain/enums';
