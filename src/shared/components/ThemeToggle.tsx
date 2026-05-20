/**
 * Three-option theme switch: Sistema / Claro / Escuro.
 *
 * The pre-paint bootstrap in public/index.html sets the initial
 * data-theme attribute. This component handles user-driven changes:
 * persists the choice to localStorage and updates the <html>
 * attribute accordingly.
 *
 * 'system' means "follow the OS" — the component listens to
 * prefers-color-scheme changes and applies them while in system mode.
 */

import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { strings } from '../strings.pt-BR';

import styles from './ThemeToggle.module.css';

type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';

function readStoredMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    /* private mode or disabled storage */
  }
  return 'system';
}

function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.setAttribute('data-theme', 'dark');
    return;
  }
  if (mode === 'light') {
    root.removeAttribute('data-theme');
    return;
  }
  // system
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(readStoredMode);

  // Apply the mode immediately on change. The bootstrap script already
  // applied the initial value before paint, so this effect handles
  // subsequent user-driven changes only.
  useEffect(() => {
    applyTheme(mode);
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* see storage.ts for rationale */
    }
  }, [mode]);

  // While in system mode, follow OS preference changes at runtime.
  useEffect(() => {
    if (mode !== 'system') return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode]);

  return (
    <div
      className={styles.group}
      role="radiogroup"
      aria-label={strings.theme.sectionLabel}
    >
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'system'}
        className={styles.option}
        onClick={() => setMode('system')}
      >
        <Monitor size={16} aria-hidden="true" />
        <span className={styles.label}>{strings.theme.system}</span>
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'light'}
        className={styles.option}
        onClick={() => setMode('light')}
      >
        <Sun size={16} aria-hidden="true" />
        <span className={styles.label}>{strings.theme.light}</span>
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'dark'}
        className={styles.option}
        onClick={() => setMode('dark')}
      >
        <Moon size={16} aria-hidden="true" />
        <span className={styles.label}>{strings.theme.dark}</span>
      </button>
    </div>
  );
}
