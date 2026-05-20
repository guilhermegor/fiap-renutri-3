import { render, screen } from '@testing-library/react';

import { RecipeMatchDTO } from '../../domain/dto';
import { CuisineCategory } from '../../domain/enums';

import { RecipeCard } from './RecipeCard';

function buildMatch(overrides: Partial<RecipeMatchDTO> = {}): RecipeMatchDTO {
  return {
    score: 6,
    matchedIngredients: ['Tomate', 'Alho'],
    recipe: {
      id: 'r-001',
      title: 'Refogado de tomate com alho',
      description: 'Um refogado simples e rápido.',
      prepTimeMinutes: 10,
      cookTimeMinutes: 15,
      servings: 2,
      category: CuisineCategory.SaladSide,
      ingredients: [{ name: 'Tomate', amount: '4 unidades' }],
      steps: ['Pique tudo.', 'Refogue.'],
    },
    ...overrides,
  };
}

describe('RecipeCard', () => {
  it('renders the recipe title', () => {
    render(<RecipeCard match={buildMatch()} urgent={false} onView={jest.fn()} />);
    expect(
      screen.getByRole('heading', { name: 'Refogado de tomate com alho' }),
    ).toBeInTheDocument();
  });

  it('shows the matched-ingredient tags from the pantry', () => {
    render(<RecipeCard match={buildMatch()} urgent={false} onView={jest.fn()} />);
    expect(screen.getByText('Tomate')).toBeInTheDocument();
    expect(screen.getByText('Alho')).toBeInTheDocument();
  });

  it('shows the urgency chip only when urgent', () => {
    const { rerender } = render(
      <RecipeCard match={buildMatch()} urgent={false} onView={jest.fn()} />,
    );
    expect(screen.queryByText('Aproveite logo!')).not.toBeInTheDocument();
    rerender(<RecipeCard match={buildMatch()} urgent onView={jest.fn()} />);
    expect(screen.getByText('Aproveite logo!')).toBeInTheDocument();
  });
});
