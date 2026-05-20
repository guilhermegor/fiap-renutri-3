import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { PantryItemCreateDTO } from '../../domain/dto';
import { FoodCategory } from '../../domain/enums';
import { strings } from '../../strings.pt-BR';
import styles from '../styles.module.css';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  // Sync signature — the caller is responsible for fire-and-forget'ing
  // any async work inside. Keeps React event-handler types happy and
  // avoids the no-misused-promises rule firing on JSX attributes.
  onSubmit: (dto: PantryItemCreateDTO) => void;
}

const CATEGORY_OPTIONS: FoodCategory[] = [
  FoodCategory.Vegetable,
  FoodCategory.Fruit,
  FoodCategory.Dairy,
  FoodCategory.Protein,
  FoodCategory.Grain,
  FoodCategory.PantryStaple,
  FoodCategory.Beverage,
  FoodCategory.Other,
];

function defaultExpiryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return format(date, 'yyyy-MM-dd');
}

export function AddItemModal({ open, onClose, onSubmit }: AddItemModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [submitting, setSubmitting] = useState(false);

  // Open/close the native dialog imperatively, since <dialog> requires
  // .showModal() to enable the backdrop + ESC-to-close behaviour.
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (open && !node.open) {
      node.showModal();
    } else if (!open && node.open) {
      node.close();
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const dto: PantryItemCreateDTO = {
      name: String(data.get('name')).trim(),
      category: String(data.get('category')) as FoodCategory,
      // type="date" returns YYYY-MM-DD; promote to start-of-day UTC ISO.
      expiresAt: new Date(`${String(data.get('expiresAt'))}T00:00:00Z`).toISOString(),
      shelfLifeDays: Number(data.get('shelfLifeDays')),
    };
    onSubmit(dto);
    form.reset();
    setSubmitting(false);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onCancel={onClose}
    >
      <div className={styles.dialogInner}>
        <div className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{strings.modal.title}</h2>
          <button
            type="button"
            className={styles.removeButton}
            aria-label={strings.modal.cancel}
            onClick={onClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="add-name">
              {strings.modal.fields.name}
            </label>
            <input
              id="add-name"
              name="name"
              type="text"
              required
              minLength={1}
              maxLength={80}
              placeholder={strings.modal.fields.namePlaceholder}
              className={styles.formInput}
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  strings.modal.validationName,
                )
              }
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="add-category">
              {strings.modal.fields.category}
            </label>
            <select
              id="add-category"
              name="category"
              required
              defaultValue={FoodCategory.Vegetable}
              className={styles.formSelect}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {strings.categoryLabels[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="add-expires">
              {strings.modal.fields.expiresAt}
            </label>
            <input
              id="add-expires"
              name="expiresAt"
              type="date"
              required
              defaultValue={defaultExpiryDate()}
              className={styles.formInput}
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  strings.modal.validationExpiresAt,
                )
              }
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="add-shelf">
              {strings.modal.fields.shelfLifeDays}
            </label>
            <input
              id="add-shelf"
              name="shelfLifeDays"
              type="number"
              required
              min={1}
              defaultValue={7}
              className={styles.formInput}
              onInvalid={(e) =>
                (e.target as HTMLInputElement).setCustomValidity(
                  strings.modal.validationShelfLife,
                )
              }
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
            <span className={styles.formHelper}>
              {strings.modal.fields.shelfLifeHelper}
            </span>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.formCancel} onClick={onClose}>
              {strings.modal.cancel}
            </button>
            <button type="submit" className={styles.formSubmit} disabled={submitting}>
              {strings.modal.submit}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
