import { ReactNode, useCallback, useMemo } from 'react';

import { useSubmitContactForm } from './application/use-cases';
import { ConsoleContactSubmitter } from './infrastructure/console-contact-submitter';
import { consoleNotifier } from './infrastructure/console-notifier';
import { ContactContext, ContactContextValue } from './use-context';

interface ContactProviderProps {
  children: ReactNode;
}

export function ContactProvider({ children }: ContactProviderProps) {
  const submitter = useMemo(() => new ConsoleContactSubmitter(), []);
  const notifier = consoleNotifier;

  const { execute, reset, submitting, succeeded, errors } = useSubmitContactForm(
    submitter,
    notifier,
  );

  // Sync wrapper so JSX event handlers don't receive a Promise (the
  // no-misused-promises rule). Fire-and-forget — the hook owns the
  // submitting/succeeded state the UI reads.
  const submit = useCallback(
    (name: string, email: string, subject: string, message: string) => {
      void execute(name, email, subject, message);
    },
    [execute],
  );

  const value = useMemo<ContactContextValue>(
    () => ({ submit, reset, submitting, succeeded, errors }),
    [submit, reset, submitting, succeeded, errors],
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}
