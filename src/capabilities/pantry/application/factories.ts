/**
 * DTO ↔ entity mapping.
 *
 * The infrastructure layer reads/writes ISO strings (JSON-safe), the
 * application + UI layers work with Date objects. Factories are
 * pure — no validation, no business rules, no side effects.
 */

import { PantryItemCreateDTO, PantryItemResponseDTO } from '../domain/dto';
import { PantryItem } from '../domain/entities';

export function pantryItemFromCreateDTO(dto: PantryItemCreateDTO): PantryItem {
  return {
    id: crypto.randomUUID(),
    name: dto.name,
    category: dto.category,
    storedAt: new Date(),
    expiresAt: new Date(dto.expiresAt),
    shelfLifeDays: dto.shelfLifeDays,
  };
}

export function pantryItemFromResponseDTO(dto: PantryItemResponseDTO): PantryItem {
  return {
    id: dto.id,
    name: dto.name,
    category: dto.category,
    storedAt: new Date(dto.storedAt),
    expiresAt: new Date(dto.expiresAt),
    shelfLifeDays: dto.shelfLifeDays,
  };
}

export function pantryItemToResponseDTO(item: PantryItem): PantryItemResponseDTO {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    storedAt: item.storedAt.toISOString(),
    expiresAt: item.expiresAt.toISOString(),
    shelfLifeDays: item.shelfLifeDays,
  };
}
