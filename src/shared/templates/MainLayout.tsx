/**
 * MainLayout — the navigation chrome that wraps every route.
 *
 * Header holds the brand mark, five nav links (the FIAP 5-page
 * budget), and the theme toggle. Below: <Outlet /> for the route
 * content. Footer carries a small legend.
 *
 * The nav uses NavLink from react-router so the current route gets
 * an `aria-current="page"` and a styled active state automatically.
 */

import { ChefHat, Home, Info, Mail, Refrigerator } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';

import { ThemeToggle } from '../components/ThemeToggle';
import { strings } from '../strings.pt-BR';

import styles from './MainLayout.module.css';

const NAV_ITEMS = [
  { to: '/', label: strings.nav.home, Icon: Home, end: true },
  { to: '/despensa', label: strings.nav.pantry, Icon: Refrigerator, end: false },
  { to: '/receitas', label: strings.nav.recipes, Icon: ChefHat, end: false },
  { to: '/fale-conosco', label: strings.nav.contact, Icon: Mail, end: false },
  { to: '/sobre', label: strings.nav.about, Icon: Info, end: false },
] as const;

export function MainLayout() {
  return (
    <div className={styles.layout}>
      <a className={styles.skipLink} href="#main-content">
        {strings.nav.skipToContent}
      </a>

      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>{strings.brand.name}</span>
        </div>

        <nav className={styles.nav} aria-label={strings.nav.ariaLabel}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ to, label, Icon, end }) => (
              <li key={to} className={styles.navItem}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                >
                  <Icon size={18} aria-hidden="true" />
                  <span className={styles.navLabel}>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerEnd}>
          <ThemeToggle />
        </div>
      </header>

      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <small className={styles.footerLegend}>{strings.footer.legend}</small>
      </footer>
    </div>
  );
}
