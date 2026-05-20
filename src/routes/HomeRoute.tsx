import { Bell, ChefHat, Leaf, PlayCircle } from 'lucide-react';
import { NavLink } from 'react-router';

import { PITCH_VIDEO_URL, strings } from './strings.pt-BR';
import styles from './styles.module.css';

export function HomeRoute() {
  const copy = strings.home;
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.heroEyebrow}>{copy.heroEyebrow}</span>
        <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
        <p className={styles.heroTagline}>{copy.heroTagline}</p>
        <p className={styles.heroLead}>{copy.heroLead}</p>
        <div className={styles.ctaRow}>
          <NavLink to="/despensa" className={styles.ctaPrimary}>
            {copy.ctaPrimary}
          </NavLink>
          <NavLink to="/receitas" className={styles.ctaSecondary}>
            {copy.ctaSecondary}
          </NavLink>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{copy.videoSectionTitle}</h2>
        <p className={styles.sectionLead}>{copy.videoSectionLead}</p>
        <div className={styles.videoCard}>
          <a
            href={PITCH_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.videoButton}
          >
            <PlayCircle size={20} aria-hidden="true" />
            {copy.videoButton}
          </a>
          <p className={styles.videoNote}>{copy.videoNote}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{copy.valuesTitle}</h2>
        <div className={styles.valuesGrid}>
          <article className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <Bell size={20} aria-hidden="true" />
            </span>
            <h3 className={styles.valueTitle}>{copy.valueOne.title}</h3>
            <p className={styles.valueBody}>{copy.valueOne.body}</p>
          </article>
          <article className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <ChefHat size={20} aria-hidden="true" />
            </span>
            <h3 className={styles.valueTitle}>{copy.valueTwo.title}</h3>
            <p className={styles.valueBody}>{copy.valueTwo.body}</p>
          </article>
          <article className={styles.valueCard}>
            <span className={styles.valueIcon}>
              <Leaf size={20} aria-hidden="true" />
            </span>
            <h3 className={styles.valueTitle}>{copy.valueThree.title}</h3>
            <p className={styles.valueBody}>{copy.valueThree.body}</p>
          </article>
        </div>
      </section>
    </div>
  );
}
