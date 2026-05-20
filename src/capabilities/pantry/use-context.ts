/**
 * PantryContext + consumer hook.
 *
 * Lives in a non-`.tsx` file so react-refresh's
 * `only-export-components` rule doesn't complain about exporting both
 * a component (the provider, in context.tsx) and non-component
 * symbols (the Context object, the hook) from the same module.
 */

import { createContext, useContext } from 'react';

import { PantryItemCreateDTO } from './domain/dto';
import { PantryItem } from './domain/entities';

export interface PantryContextValue {
  items: PantryItem[];
  loading: boolean;
  addItem: (dto: PantryItemCreateDTO) => Promise<PantryItem | null>;
  removeItem: (id: string, displayName: string) => Promise<boolean>;
  refresh: () => Promise<void>;
}

export const PantryContext = createContext<PantryContextValue | null>(null);

export function usePantryContext(): PantryContextValue {
  const ctx = useContext(PantryContext);
  if (!ctx) {
    throw new Error('usePantryContext must be used within PantryProvider');
  }
  return ctx;
}
