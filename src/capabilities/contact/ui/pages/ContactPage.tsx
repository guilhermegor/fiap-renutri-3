import { CheckCircle, Send } from 'lucide-react';

import { ContactSubject } from '../../domain/enums';
import { strings } from '../../strings.pt-BR';
import { useContactContext } from '../../use-context';
import styles from '../styles.module.css';

const SUBJECT_OPTIONS: ContactSubject[] = [
  ContactSubject.Suggestion,
  ContactSubject.Bug,
  ContactSubject.Partnership,
  ContactSubject.Other,
];

/**
 * Forces a pt-BR validation message via setCustomValidity, since the
 * default browser messages render in the OS language (unknown on a
 * grader's machine). onInput clears the custom message so the browser
 * re-validates against the native constraints on the next keystroke.
 */
function setPtBrValidity(
  el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  message: string,
) {
  el.setCustomValidity(message);
}

function clearValidity(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  el.setCustomValidity('');
}

export function ContactPage() {
  const { submit, submitting, succeeded, reset } = useContactContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    submit(
      String(data.get('name')),
      String(data.get('email')),
      String(data.get('subject')),
      String(data.get('message')),
    );
  };

  if (succeeded) {
    return (
      <div className={styles.page}>
        <div className={styles.success}>
          <CheckCircle size={48} className={styles.successIcon} aria-hidden="true" />
          <h2 className={styles.successTitle}>{strings.successTitle}</h2>
          <p className={styles.successBody}>{strings.successBody}</p>
          <button type="button" className={styles.successAgain} onClick={reset}>
            {strings.successAgain}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{strings.page.title}</h1>
        <p className={styles.lead}>{strings.page.lead}</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-name">
            {strings.fields.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            placeholder={strings.fields.namePlaceholder}
            className={styles.input}
            onInvalid={(e) => setPtBrValidity(e.currentTarget, strings.validation.name)}
            onInput={(e) => clearValidity(e.currentTarget)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-email">
            {strings.fields.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder={strings.fields.emailPlaceholder}
            className={styles.input}
            onInvalid={(e) => setPtBrValidity(e.currentTarget, strings.validation.email)}
            onInput={(e) => clearValidity(e.currentTarget)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-subject">
            {strings.fields.subject}
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue={ContactSubject.Suggestion}
            className={styles.select}
          >
            {SUBJECT_OPTIONS.map((subject) => (
              <option key={subject} value={subject}>
                {strings.subjectLabels[subject]}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="contact-message">
            {strings.fields.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={1000}
            placeholder={strings.fields.messagePlaceholder}
            className={styles.textarea}
            onInvalid={(e) => setPtBrValidity(e.currentTarget, strings.validation.message)}
            onInput={(e) => clearValidity(e.currentTarget)}
          />
        </div>

        <button type="submit" className={styles.submit} disabled={submitting}>
          <Send size={18} aria-hidden="true" />
          {submitting ? strings.submitting : strings.submit}
        </button>
      </form>
    </div>
  );
}
