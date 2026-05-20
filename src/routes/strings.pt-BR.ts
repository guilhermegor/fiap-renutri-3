/**
 * pt-BR copy for the static routes (Home + Sobre).
 *
 * Dynamic routes (Pantry, Recipes, Contact) own their copy in their
 * respective capability strings files.
 */

export const strings = {
  home: {
    heroEyebrow: 'Bem-vindo ao',
    heroTitle: 'renutri',
    heroTagline: 'Sua despensa organizada. Sua comida aproveitada.',
    heroLead:
      'A gente acompanha o frescor dos seus alimentos e sugere receitas com o que está perto do vencimento — pra você economizar dinheiro e reduzir o desperdício, sem complicação.',
    ctaPrimary: 'Abrir a despensa',
    ctaSecondary: 'Ver as receitas',
    videoSectionTitle: 'Conheça em 2 minutos',
    videoSectionLead:
      'Acompanhe a jornada da Ana — uma cozinha brasileira de verdade, com geladeira cheia, agenda lotada e zero desperdício.',
    videoButton: 'Assistir ao Pitch Video',
    videoNote: 'Abre em uma nova aba.',
    valuesTitle: 'Por que o renutri faz sentido',
    valueOne: {
      title: 'Visibilidade na hora certa',
      body: 'Avisos amigáveis quando um item está chegando no fim da validade — sem sustos.',
    },
    valueTwo: {
      title: 'Receitas que aproveitam',
      body: 'Sugestões priorizadas pelos ingredientes que você precisa usar já — cozinha primeiro o que pede mais atenção.',
    },
    valueThree: {
      title: 'Cuidado com o planeta',
      body: 'Cada item aproveitado é menos comida no lixo. Pequeno gesto na sua casa, impacto coletivo enorme.',
    },
  },
  about: {
    heroEyebrow: 'Sobre o projeto',
    heroTitle: 'Comida boa não precisa virar lixo',
    heroLead:
      'O renutri nasceu como entrega do PBL da FIAP — Fase 3 da disciplina Agrotech. A ideia partiu de um número que machuca: 30% da comida produzida no Brasil é descartada, enquanto 18 milhões de pessoas convivem com a insegurança alimentar.',
    contextTitle: 'O contexto',
    contextBody:
      'Famílias brasileiras de classe média perdem em torno de R$ 150 por mês porque esqueceram a validade de algum item na geladeira ou na dispensa. O renutri ataca exatamente esse ponto: visibilidade do que tem em casa, lembrete antes do vencimento, e uma receita pra aproveitar o que já estaria perto de virar lixo.',
    sdgTitle: 'Conexão com os ODS',
    sdgBody:
      'O projeto se alinha ao Objetivo 2 de Desenvolvimento Sustentável da ONU — Fome Zero e Agricultura Sustentável — com foco no combate ao desperdício alimentar dentro do lar.',
    teamTitle: 'O time — Grupo 20',
    teamLead: 'Cinco estudantes da FIAP, uma ideia compartilhada, três fases de trabalho:',
    teamMembers: [
      'August Aguiar Gruber',
      'Rogerio Gajewski Piatek dos Santos',
      'Vladimir Leal Sposito de Oliveira',
      'Guilherme Oliveira Rodrigues',
      'Nicole Rodrigues da Silva Oliveira',
    ],
    phaseTitle: 'A jornada do projeto',
    phaseOne: {
      title: 'Fase 1 — Pesquisa',
      body: 'Definição do problema, persona Ana Silva e dimensionamento do mercado.',
    },
    phaseTwo: {
      title: 'Fase 2 — Pitch',
      body: 'Vídeo de proposta cinematográfico, gravado em estilo documental brasileiro.',
    },
    phaseThree: {
      title: 'Fase 3 — Protótipo',
      body: 'A SPA que você está navegando — interface limpa, paleta verde, pt-BR de ponta a ponta.',
    },
  },
  placeholder: {
    pantryHeading: 'Despensa',
    recipesHeading: 'Receitas',
    contactHeading: 'Fale Conosco',
    underConstruction: 'Em breve.',
  },
} as const;

/**
 * Pitch Video URL — replace before submission with the real YouTube
 * link. The TXT file at the repo root (INTEGRANTES.txt) holds the
 * same link as a backup for the FIAP grader.
 */
export const PITCH_VIDEO_URL = 'https://youtu.be/PITCH-VIDEO-PLACEHOLDER';
