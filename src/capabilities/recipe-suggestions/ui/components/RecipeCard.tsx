import { AlertTriangle, ChefHat, Clock, Users } from 'lucide-react';

import { RecipeMatchDTO } from '../../domain/dto';
import { strings } from '../../strings.pt-BR';
import styles from '../styles.module.css';

interface RecipeCardProps {
  match: RecipeMatchDTO;
  /** True when at least one matched ingredient is critical/aging urgent. */
  urgent: boolean;
  onView: (match: RecipeMatchDTO) => void;
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

export function RecipeCard({ match, urgent, onView }: RecipeCardProps) {
  const { recipe, matchedIngredients } = match;
  const servingsLabel =
    recipe.servings === 1
      ? strings.card.servingsOne
      : interpolate(strings.card.servings, { n: recipe.servings });

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <h2 className={styles.cardTitle}>{recipe.title}</h2>
      </div>

      <span className={styles.categoryChip}>
        {strings.categoryLabels[recipe.category]}
      </span>

      {urgent && (
        <span className={styles.urgentChip}>
          <AlertTriangle size={14} aria-hidden="true" />
          {strings.card.urgentCritical}
        </span>
      )}

      <p className={styles.description}>{recipe.description}</p>

      {matchedIngredients.length > 0 && (
        <div className={styles.matched}>
          <span className={styles.matchedLabel}>{strings.card.matchedPrefix}</span>
          <div className={styles.matchedTags}>
            {matchedIngredients.map((name) => (
              <span key={name} className={styles.matchedTag}>
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Clock size={14} aria-hidden="true" />
          {interpolate(strings.card.prepTime, { n: recipe.prepTimeMinutes })}
        </span>
        <span className={styles.metaItem}>
          <ChefHat size={14} aria-hidden="true" />
          {interpolate(strings.card.cookTime, { n: recipe.cookTimeMinutes })}
        </span>
        <span className={styles.metaItem}>
          <Users size={14} aria-hidden="true" />
          {servingsLabel}
        </span>
      </div>

      <button type="button" className={styles.viewButton} onClick={() => onView(match)}>
        {strings.card.viewRecipe}
      </button>
    </article>
  );
}
