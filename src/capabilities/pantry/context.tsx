/**
 * Composition root for the pantry capability.
 *
 * Instantiates the concrete LocalStoragePantryRepository, wires it
 * into the use-case hooks, and memoizes the context value. No
 * business decisions live here — see application/use-cases.ts and
 * shared/utils/ripeness.ts for those.
 */

import { ReactNode, useCallback, useMemo } from 'react';

import { useAddPantryItem, useListPantryItems, useRemovePantryItem } from './application/use-cases';
import { PantryItemCreateDTO } from './domain/dto';
import { PantryItem } from './domain/entities';
import { consoleNotifier } from './infrastructure/console-notifier';
import { LocalStoragePantryRepository } from './infrastructure/local-storage-pantry-repository';
import { PantryContext, PantryContextValue } from './use-context';

interface PantryProviderProps {
  children: ReactNode;
}

export function PantryProvider({ children }: PantryProviderProps) {
  const repo = useMemo(() => new LocalStoragePantryRepository(), []);
  const notifier = consoleNotifier;

  const { items, refresh, loading } = useListPantryItems(repo);
  const { execute: addExecute } = useAddPantryItem(repo, notifier);
  const { execute: removeExecute } = useRemovePantryItem(repo, notifier);

  const addItem = useCallback(
    async (dto: PantryItemCreateDTO): Promise<PantryItem | null> => {
      const result = await addExecute(dto);
      if (result) {
        await refresh();
      }
      return result;
    },
    [addExecute, refresh],
  );

  const removeItem = useCallback(
    async (id: string, displayName: string): Promise<boolean> => {
      const ok = await removeExecute(id, displayName);
      if (ok) {
        await refresh();
      }
      return ok;
    },
    [removeExecute, refresh],
  );

  const value = useMemo<PantryContextValue>(
    () => ({ items, loading, addItem, removeItem, refresh }),
    [items, loading, addItem, removeItem, refresh],
  );

  return <PantryContext.Provider value={value}>{children}</PantryContext.Provider>;
}
