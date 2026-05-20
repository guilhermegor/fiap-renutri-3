/**
 * Port interfaces — contracts that infrastructure adapters implement.
 *
 * Ports speak the capability's domain language (PantryItem entities,
 * not raw DTOs or storage primitives). The boundaries rule forbids
 * application/infrastructure from importing from shared, so the
 * INotifier port is re-declared here per Plan agent's advice — three
 * 8-line interfaces beat bending the layer rules.
 */

import { PantryItem } from './entities';

export interface IPantryRepository {
  findAll(): Promise<PantryItem[]>;
  add(item: PantryItem): Promise<PantryItem>;
  remove(id: string): Promise<void>;
}

export interface INotifier {
  success(message: string): void;
  error(message: string): void;
  info(message: string): void;
}
