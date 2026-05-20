import { strings } from './strings.pt-BR';
import styles from './styles.module.css';

export function SobreRoute() {
  const copy = strings.about;
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.heroEyebrow}>{copy.heroEyebrow}</span>
        <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
        <p className={styles.heroLead}>{copy.heroLead}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{copy.contextTitle}</h2>
        <p className={styles.sectionLead}>{copy.contextBody}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{copy.sdgTitle}</h2>
        <p className={styles.sectionLead}>{copy.sdgBody}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{copy.teamTitle}</h2>
        <p className={styles.sectionLead}>{copy.teamLead}</p>
        <ul className={styles.teamList}>
          {copy.teamMembers.map((name) => (
            <li key={name} className={styles.teamMember}>
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{copy.phaseTitle}</h2>
        <div className={styles.phaseList}>
          <article className={styles.phaseCard}>
            <h3 className={styles.phaseTitle}>{copy.phaseOne.title}</h3>
            <p className={styles.phaseBody}>{copy.phaseOne.body}</p>
          </article>
          <article className={styles.phaseCard}>
            <h3 className={styles.phaseTitle}>{copy.phaseTwo.title}</h3>
            <p className={styles.phaseBody}>{copy.phaseTwo.body}</p>
          </article>
          <article className={styles.phaseCard}>
            <h3 className={styles.phaseTitle}>{copy.phaseThree.title}</h3>
            <p className={styles.phaseBody}>{copy.phaseThree.body}</p>
          </article>
        </div>
      </section>
    </div>
  );
}
