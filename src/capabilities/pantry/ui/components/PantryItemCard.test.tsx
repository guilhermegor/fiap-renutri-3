/**
 * Single representative test for the pantry capability per the Plan
 * agent's "one component test per capability" floor. Pins down that
 * the card renders its core data without exploding.
 */

import { render, screen } from '@testing-library/react';

import { PantryItem } from '../../domain/entities';
import { FoodCategory } from '../../domain/enums';

import { PantryItemCard } from './PantryItemCard';

// Local-time constructors so date-fns' differenceInCalendarDays
// (which is timezone-aware) returns the same value regardless of
// where the test runs. UTC constants would drift by ±1 day depending
// on the host machine's timezone.
const NOW = new Date(2026, 4, 20, 12, 0, 0);

function buildItem(overrides: Partial<PantryItem> = {}): PantryItem {
  return {
    id: 'p-001',
    name: 'Tomate italiano',
    category: FoodCategory.Vegetable,
    storedAt: new Date(2026, 4, 15, 10, 0, 0),
    expiresAt: new Date(2026, 4, 23, 12, 0, 0),
    shelfLifeDays: 7,
    ...overrides,
  };
}

describe('PantryItemCard', () => {
  it('renders the item name as a heading', () => {
    render(<PantryItemCard item={buildItem()} now={NOW} onRemove={jest.fn()} onSelect={jest.fn()} />);
    expect(
      screen.getByRole('heading', { name: 'Tomate italiano' }),
    ).toBeInTheDocument();
  });

  it('shows pt-BR "Vence em 3 dias" copy for an item expiring in 3 days', () => {
    render(<PantryItemCard item={buildItem()} now={NOW} onRemove={jest.fn()} onSelect={jest.fn()} />);
    expect(screen.getByText('Vence em 3 dias')).toBeInTheDocument();
  });

  it('exposes an accessible remove button with the item name', () => {
    render(<PantryItemCard item={buildItem()} now={NOW} onRemove={jest.fn()} onSelect={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: /remover tomate italiano da despensa/i }),
    ).toBeInTheDocument();
  });
});
