import { Circle } from 'lucide-react';

import { Ripeness } from '@/shared/utils/ripeness';

import { strings } from '../../strings.pt-BR';
import styles from '../styles.module.css';

interface RipenessBadgeProps {
  ripeness: Ripeness;
}

const STATE_TO_CLASS: Record<Ripeness, string> = {
  [Ripeness.Fresh]: styles.badgeFresh,
  [Ripeness.Peak]: styles.badgePeak,
  [Ripeness.Aging]: styles.badgeAging,
  [Ripeness.Critical]: styles.badgeCritical,
  [Ripeness.Spoiled]: styles.badgeSpoiled,
};

const STATE_TO_COLOR_VAR: Record<Ripeness, string> = {
  [Ripeness.Fresh]: 'var(--ripeness-fresh)',
  [Ripeness.Peak]: 'var(--ripeness-peak)',
  [Ripeness.Aging]: 'var(--ripeness-aging)',
  [Ripeness.Critical]: 'var(--ripeness-critical)',
  [Ripeness.Spoiled]: 'var(--ripeness-spoiled)',
};

export function RipenessBadge({ ripeness }: RipenessBadgeProps) {
  const label = strings.ripeness[ripeness];
  return (
    <span className={`${styles.badge} ${STATE_TO_CLASS[ripeness]}`}>
      <Circle
        size={12}
        fill={STATE_TO_COLOR_VAR[ripeness]}
        strokeWidth={0}
        className={styles.badgeIcon}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
