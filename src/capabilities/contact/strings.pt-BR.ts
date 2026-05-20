import { ContactSubject } from './domain/enums';

export const strings = {
  page: {
    title: 'Fale Conosco',
    lead:
      'Tem uma sugestão, encontrou um problema ou quer falar de parceria? A gente adora ouvir você.',
  },
  fields: {
    name: 'Seu nome',
    namePlaceholder: 'Como podemos te chamar?',
    email: 'Seu e-mail',
    emailPlaceholder: 'voce@exemplo.com',
    subject: 'Assunto',
    message: 'Mensagem',
    messagePlaceholder: 'Conta pra gente o que você está pensando…',
  },
  validation: {
    name: 'Coloca seu nome, por favor.',
    email: 'Confere o e-mail — parece que falta algo.',
    subject: 'Escolhe um assunto.',
    message: 'Conta um pouco mais na mensagem (mínimo 10 caracteres).',
  },
  submit: 'Enviar mensagem',
  submitting: 'Enviando…',
  successTitle: 'Mensagem enviada!',
  successBody: 'Obrigado por falar com a gente. Vamos responder em breve no seu e-mail.',
  successAgain: 'Enviar outra mensagem',
  subjectLabels: {
    [ContactSubject.Suggestion]: 'Sugestão',
    [ContactSubject.Bug]: 'Reportar um problema',
    [ContactSubject.Partnership]: 'Parceria',
    [ContactSubject.Other]: 'Outro',
  } as const,
} as const;
