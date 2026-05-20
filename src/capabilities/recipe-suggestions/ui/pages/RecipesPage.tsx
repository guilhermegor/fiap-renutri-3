import { useState } from 'react';

import { RecipeDTO, RecipeMatchDTO } from '../../domain/dto';
import { strings } from '../../strings.pt-BR';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import styles from '../styles.module.css';

interface RecipesPageProps {
  suggestions: RecipeMatchDTO[];
  /** Names of pantry ingredients that are critical/aging — drive the urgency chip. */
  urgentIngredientNames: string[];
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

function isUrgentMatch(match: RecipeMatchDTO, urgentNames: string[]): boolean {
  const urgentLower = urgentNames.map((n) => n.toLowerCase());
  return match.matchedIngredients.some((ingredient) =>
    urgentLower.some(
      (urgent) =>
        urgent.includes(ingredient.toLowerCase()) ||
        ingredient.toLowerCase().includes(urgent),
    ),
  );
}

export function RecipesPage({ suggestions, urgentIngredientNames }: RecipesPageProps) {
  const [openRecipe, setOpenRecipe] = useState<RecipeDTO | null>(null);

  if (suggestions.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{strings.page.title}</h1>
          <p className={styles.lead}>{strings.page.leadEmpty}</p>
        </header>
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>{strings.page.emptyTitle}</h2>
          <p className={styles.emptyBody}>{strings.page.emptyBody}</p>
        </div>
      </div>
    );
  }

  const countLabel =
    suggestions.length === 1
      ? strings.page.suggestionCountOne
      : interpolate(strings.page.suggestionCount, { n: suggestions.length });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{strings.page.title}</h1>
        <p className={styles.lead}>{strings.page.leadWithItems}</p>
        <span className={styles.count}>{countLabel}</span>
      </header>

      <ul className={styles.grid}>
        {suggestions.map((match) => (
          <li key={match.recipe.id} className={styles.gridItem}>
            <RecipeCard
              match={match}
              urgent={isUrgentMatch(match, urgentIngredientNames)}
              onView={(m) => setOpenRecipe(m.recipe)}
            />
          </li>
        ))}
      </ul>

      <RecipeDetailModal recipe={openRecipe} onClose={() => setOpenRecipe(null)} />
    </div>
  );
}
