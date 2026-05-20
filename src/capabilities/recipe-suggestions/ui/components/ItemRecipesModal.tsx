import { ChefHat, Clock, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { RecipeDTO } from '../../domain/dto';
import { strings } from '../../strings.pt-BR';
import styles from '../styles.module.css';

import { RecipeDetailModal } from './RecipeDetailModal';

interface ItemRecipesModalProps {
  /** When non-null, the modal is open and shows recipes for this ingredient. */
  ingredientName: string | null;
  recipes: RecipeDTO[];
  onClose: () => void;
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

export function ItemRecipesModal({ ingredientName, recipes, onClose }: ItemRecipesModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openRecipe, setOpenRecipe] = useState<RecipeDTO | null>(null);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (ingredientName && !node.open) {
      node.showModal();
    } else if (!ingredientName && node.open) {
      node.close();
    }
  }, [ingredientName]);

  const handleClose = () => {
    setOpenRecipe(null);
    onClose();
  };

  const countLabel =
    recipes.length === 1
      ? strings.itemModal.countOne
      : interpolate(strings.itemModal.count, { n: recipes.length });

  return (
    <>
      <dialog ref={dialogRef} className={styles.dialog} onClose={handleClose} onCancel={handleClose}>
        {ingredientName && (
          <div className={styles.dialogInner}>
            <div className={styles.dialogHeader}>
              <h2 className={styles.dialogTitle}>
                {interpolate(strings.itemModal.title, { item: ingredientName })}
              </h2>
              <button
                type="button"
                className={styles.closeButton}
                aria-label={strings.itemModal.close}
                onClick={handleClose}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {recipes.length === 0 ? (
              <div className={styles.empty}>
                <h3 className={styles.emptyTitle}>{strings.itemModal.emptyTitle}</h3>
                <p className={styles.emptyBody}>{strings.itemModal.emptyBody}</p>
              </div>
            ) : (
              <>
                <p className={styles.description}>{strings.itemModal.lead}</p>
                <span className={styles.count}>{countLabel}</span>
                <ul className={styles.itemRecipeList}>
                  {recipes.map((recipe) => (
                    <li key={recipe.id}>
                      <button
                        type="button"
                        className={styles.itemRecipeRow}
                        onClick={() => setOpenRecipe(recipe)}
                      >
                        <span className={styles.itemRecipeName}>{recipe.title}</span>
                        <span className={styles.itemRecipeMeta}>
                          <Clock size={14} aria-hidden="true" />
                          {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                          <ChefHat size={14} aria-hidden="true" />
                          {strings.categoryLabels[recipe.category]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </dialog>

      <RecipeDetailModal recipe={openRecipe} onClose={() => setOpenRecipe(null)} />
    </>
  );
}
