/**
 * Use-case hooks — one per user intent.
 *
 * Each hook owns its own loading + error state. Accepts port
 * interfaces (never concrete adapters) so capabilities stay testable
 * with mock ports.
 */

import { useCallback, useEffect, useState } from 'react';

import { PantryItemCreateDTO } from '../domain/dto';
import { PantryItem } from '../domain/entities';
import { INotifier, IPantryRepository } from '../domain/ports';

import { pantryItemFromCreateDTO } from './factories';

export function useListPantryItems(repo: IPantryRepository) {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findAll();
      setItems(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [repo]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { items, refresh, loading, error };
}

export function useAddPantryItem(repo: IPantryRepository, notifier: INotifier) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (dto: PantryItemCreateDTO): Promise<PantryItem | null> => {
      setLoading(true);
      setError(null);
      try {
        const item = pantryItemFromCreateDTO(dto);
        const saved = await repo.add(item);
        notifier.success(`${saved.name} foi adicionado à sua despensa.`);
        return saved;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        notifier.error(`Não foi possível adicionar o alimento: ${e.message}`);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [repo, notifier],
  );

  return { execute, loading, error };
}

export function useRemovePantryItem(repo: IPantryRepository, notifier: INotifier) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (id: string, displayName: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await repo.remove(id);
        notifier.info(`${displayName} foi removido.`);
        return true;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        notifier.error(`Não foi possível remover o alimento: ${e.message}`);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [repo, notifier],
  );

  return { execute, loading, error };
}
