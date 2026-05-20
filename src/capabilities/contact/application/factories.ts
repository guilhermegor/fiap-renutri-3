/**
 * Pure validation for the contact form.
 *
 * Returns a discriminated union so callers can't read `value` unless
 * validation passed — TypeScript narrows it. The HTML5 form provides
 * the first line of validation (required, type=email); this function
 * is the belt-and-braces second line, and keeps the rules testable
 * outside the DOM.
 */

import { ContactFormDTO } from '../domain/dto';
import { ContactSubject } from '../domain/enums';

export type ContactValidationResult =
  | { ok: true; value: ContactFormDTO }
  | { ok: false; errors: string[] };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;

export function validateContactForm(
  name: string,
  email: string,
  subject: string,
  message: string,
): ContactValidationResult {
  const errors: string[] = [];

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length < MIN_NAME_LENGTH) {
    errors.push('Coloca seu nome, por favor.');
  }
  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.push('Confere o e-mail — parece que falta algo.');
  }
  if (!Object.values(ContactSubject).includes(subject as ContactSubject)) {
    errors.push('Escolhe um assunto.');
  }
  if (trimmedMessage.length < MIN_MESSAGE_LENGTH) {
    errors.push('Conta um pouco mais na mensagem (mínimo 10 caracteres).');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name: trimmedName,
      email: trimmedEmail,
      subject: subject as ContactSubject,
      message: trimmedMessage,
    },
  };
}
