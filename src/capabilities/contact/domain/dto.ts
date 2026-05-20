import { ContactSubject } from './enums';

export interface ContactFormDTO {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
}
