import { createContext, useContext } from 'react';

export interface ContactContextValue {
  submit: (name: string, email: string, subject: string, message: string) => void;
  reset: () => void;
  submitting: boolean;
  succeeded: boolean;
  errors: string[];
}

export const ContactContext = createContext<ContactContextValue | null>(null);

export function useContactContext(): ContactContextValue {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error('useContactContext must be used within ContactProvider');
  }
  return ctx;
}
