import { ContactFormDTO } from './dto';

export interface IContactSubmitter {
  submit(form: ContactFormDTO): Promise<void>;
}

export interface INotifier {
  success(message: string): void;
  error(message: string): void;
  info(message: string): void;
}
