/**
 * Contact submitter that logs to the console instead of hitting a
 * backend.
 *
 * The FIAP brief is explicit: the Fale Conosco form must validate its
 * data using HTML5 features but does NOT need a working backend. This
 * adapter satisfies the port contract while keeping the SPA fully
 * static — no fetch, no SMTP, no third-party service.
 */

import { ContactFormDTO } from '../domain/dto';
import { IContactSubmitter } from '../domain/ports';

export class ConsoleContactSubmitter implements IContactSubmitter {
  async submit(form: ContactFormDTO): Promise<void> {
     
    console.info('[contact:submit]', form);
  }
}
