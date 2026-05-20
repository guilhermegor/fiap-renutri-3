import { useCallback, useState } from 'react';

import { IContactSubmitter, INotifier } from '../domain/ports';

import { validateContactForm } from './factories';

export function useSubmitContactForm(submitter: IContactSubmitter, notifier: INotifier) {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const execute = useCallback(
    async (
      name: string,
      email: string,
      subject: string,
      message: string,
    ): Promise<boolean> => {
      const result = validateContactForm(name, email, subject, message);
      if (!result.ok) {
        setErrors(result.errors);
        result.errors.forEach((e) => notifier.error(e));
        return false;
      }

      setErrors([]);
      setSubmitting(true);
      try {
        await submitter.submit(result.value);
        setSucceeded(true);
        notifier.success(
          `Valeu, ${result.value.name}! Recebemos sua mensagem e vamos responder em breve.`,
        );
        return true;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setErrors([e.message]);
        notifier.error(`Não foi possível enviar agora: ${e.message}`);
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [submitter, notifier],
  );

  const reset = useCallback(() => {
    setSucceeded(false);
    setErrors([]);
  }, []);

  return { execute, reset, submitting, succeeded, errors };
}
