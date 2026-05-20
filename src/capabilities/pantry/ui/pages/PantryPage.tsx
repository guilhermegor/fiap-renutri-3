import { differenceInCalendarDays } from 'date-fns';
import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { PantryItem } from '../../domain/entities';
import { strings } from '../../strings.pt-BR';
import { usePantryContext } from '../../use-context';
import { AddItemModal } from '../components/AddItemModal';
import { PantryItemCard } from '../components/PantryItemCard';
import styles from '../styles.module.css';

interface PantryPageProps {
  /** Opens the per-item recipe drill-down. Wired by PantryRoute, which
      composes the pantry and recipe-suggestions capabilities. */
  onSelectItem: (item: PantryItem) => void;
}

function pickGreeting(now: Date): string {
  const hour = now.getHours();
  if (hour < 12) return strings.page.greetingMorning;
  if (hour < 18) return strings.page.greetingAfternoon;
  return strings.page.greetingEvening;
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}

export function PantryPage({ onSelectItem }: PantryPageProps) {
  const { items, addItem, removeItem } = usePantryContext();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Render-time "now" so ripeness recomputes on every render. Captured
  // once per render to keep all card calculations in sync.
  const now = useMemo(() => new Date(), []);
  const greeting = useMemo(() => pickGreeting(now), [now]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? items.filter((item) => item.name.toLowerCase().includes(query))
      : items;
  }, [items, search]);

  // Sort by daysToExpiry ascending — at-risk items first. This is
  // the urgency-first UX pattern the brand doc §8.1 calls out as the
  // central design choice.
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aDays = differenceInCalendarDays(a.expiresAt, now);
      const bDays = differenceInCalendarDays(b.expiresAt, now);
      return aDays - bDays;
    });
  }, [filtered, now]);

  const countLabel =
    items.length === 1
      ? interpolate(strings.page.countSingular, { n: items.length })
      : interpolate(strings.page.countPlural, { n: items.length });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>{greeting}</h1>
        <span className={styles.itemCount}>{countLabel}</span>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            className={styles.searchInput}
            placeholder={strings.page.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={strings.page.searchPlaceholder}
          />
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={() => setModalOpen(true)}
        >
          <Plus size={18} aria-hidden="true" />
          {strings.page.addItemLabel}
        </button>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>{strings.page.emptyTitle}</h2>
          <p className={styles.emptyBody}>{strings.page.emptyBody}</p>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => setModalOpen(true)}
          >
            <Plus size={18} aria-hidden="true" />
            {strings.page.emptyCta}
          </button>
        </div>
      ) : (
        <>
          <span className={styles.sortLabel}>{strings.page.sortLabel}</span>
          <ul className={styles.itemList}>
            {sorted.map((item) => (
              <li key={item.id} className={styles.itemListItem}>
                <PantryItemCard
                  item={item}
                  now={now}
                  onRemove={(id, name) => {
                    void removeItem(id, name);
                  }}
                  onSelect={onSelectItem}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      <AddItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(dto) => {
          // Fire-and-forget. The optimistic UX is acceptable here —
          // localStorage operations resolve synchronously in practice,
          // and addItem refreshes the items list via the context.
          void addItem(dto);
        }}
      />
    </div>
  );
}
