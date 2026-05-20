import { differenceInCalendarDays, format } from 'date-fns';
import { ChevronRight, X } from 'lucide-react';

import { Ripeness, computeRipeness } from '@/shared/utils/ripeness';

import { PantryItem } from '../../domain/entities';
import { strings } from '../../strings.pt-BR';
import styles from '../styles.module.css';

import { RipenessBadge } from './RipenessBadge';

interface PantryItemCardProps {
  item: PantryItem;
  now: Date;
  onRemove: (id: string, displayName: string) => void;
  onSelect: (item: PantryItem) => void;
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

function daysToExpiryCopy(item: PantryItem, now: Date): string {
  const days = differenceInCalendarDays(item.expiresAt, now);
  if (days < 0) {
    return days === -1
      ? strings.card.daysExpiredOne
      : interpolate(strings.card.daysExpiredMany, { n: Math.abs(days) });
  }
  if (days === 0) return strings.card.daysToday;
  if (days === 1) return strings.card.daysTomorrow;
  return interpolate(strings.card.daysFuture, { n: days });
}

export function PantryItemCard({ item, now, onRemove, onSelect }: PantryItemCardProps) {
  const ripeness = computeRipeness(item.expiresAt, now);
  const isUrgent = ripeness === Ripeness.Critical || ripeness === Ripeness.Aging;
  const cardClassName = isUrgent ? `${styles.card} ${styles.cardCritical}` : styles.card;

  // The whole card is a button that opens the per-item recipe modal. The
  // remove (X) is a separate button layered on top — its handler stops
  // propagation so removing an item never also opens the recipe modal.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(item);
    }
  };

  return (
    <article className={cardClassName}>
      <div
        className={styles.cardClickable}
        role="button"
        tabIndex={0}
        aria-label={interpolate(strings.card.selectAriaLabel, { name: item.name })}
        onClick={() => onSelect(item)}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>{item.name}</h2>
        </div>

        <span className={styles.categoryChip}>{strings.categoryLabels[item.category]}</span>

        <RipenessBadge ripeness={ripeness} />

        <div className={styles.cardMeta}>
          <div className={styles.expiryRow}>{daysToExpiryCopy(item, now)}</div>
          <div className={styles.storedAtRow}>
            {strings.card.storedAtPrefix} {format(item.storedAt, 'dd/MM/yyyy')}
          </div>
        </div>

        <span className={styles.viewRecipesHint}>
          {strings.card.viewRecipesHint}
          <ChevronRight size={14} aria-hidden="true" />
        </span>
      </div>

      <button
        type="button"
        className={styles.removeButton}
        aria-label={interpolate(strings.card.removeAriaLabel, { name: item.name })}
        onClick={(event) => {
          event.stopPropagation();
          onRemove(item.id, item.name);
        }}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </article>
  );
}
