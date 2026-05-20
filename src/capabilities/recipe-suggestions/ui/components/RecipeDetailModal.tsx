import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { RecipeDTO } from '../../domain/dto';
import { strings } from '../../strings.pt-BR';
import styles from '../styles.module.css';

interface RecipeDetailModalProps {
  recipe: RecipeDTO | null;
  onClose: () => void;
}

export function RecipeDetailModal({ recipe, onClose }: RecipeDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (recipe && !node.open) {
      node.showModal();
    } else if (!recipe && node.open) {
      node.close();
    }
  }, [recipe]);

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose} onCancel={onClose}>
      {recipe && (
        <div className={styles.dialogInner}>
          <div className={styles.dialogHeader}>
            <h2 className={styles.dialogTitle}>{recipe.title}</h2>
            <button
              type="button"
              className={styles.closeButton}
              aria-label={strings.card.close}
              onClick={onClose}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <p className={styles.description}>{recipe.description}</p>

          <div>
            <h3 className={styles.sectionLabel}>{strings.card.ingredientsTitle}</h3>
            <ul className={styles.ingredientList}>
              {recipe.ingredients.map((ing) => (
                <li key={ing.name} className={styles.ingredientItem}>
                  {ing.amount} de {ing.name}
                  {ing.optional ? ' (opcional)' : ''}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.sectionLabel}>{strings.card.stepsTitle}</h3>
            <ol className={styles.stepList}>
              {recipe.steps.map((step, index) => (
                <li key={index} className={styles.stepItem}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </dialog>
  );
}
