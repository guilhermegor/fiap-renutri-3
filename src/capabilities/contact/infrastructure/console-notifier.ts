import { INotifier } from '../domain/ports';

export const consoleNotifier: INotifier = {
  success: (message) => {
     
    console.info('[contact:success]', message);
  },
  error: (message) => {
     
    console.error('[contact:error]', message);
  },
  info: (message) => {
     
    console.info('[contact:info]', message);
  },
};
