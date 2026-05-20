/* ============================================================================
 * renutri — vanilla single-page app (FIAP delivery)
 *
 * A hand-written port of the React + TypeScript app into one plain JS file,
 * with no framework and no build step: open index.html and it runs.
 *
 * Sections (top-down):
 *   1.  Icons            — inline SVG markup (lucide-style)
 *   2.  Data             — copy strings, category labels, recipe catalogue
 *   3.  Domain           — dates, ripeness, recipe scoring (pure functions)
 *   4.  Persistence      — localStorage-backed pantry, with a demo seed
 *   5.  Helpers          — DOM + string utilities
 *   6.  Theme            — system / light / dark toggle
 *   7.  Modals           — stackable overlay (recipe detail, item recipes…)
 *   8.  Pages            — Início, Despensa, Receitas, Fale Conosco, Sobre
 *   9.  Router           — hash-based, runs from file://
 *   10. Bootstrap        — render chrome, wire global events, first route
 *
 * Security note: rendering uses innerHTML with EVERY dynamic value passed
 * through esc() (HTML-escapes & < > " '). The only user-controlled input is
 * pantry item names + the search box, escaped at each injection point;
 * recipe data and copy are authored constants.
 * ==========================================================================*/

'use strict';

/* ---------- 1. Icons ---------------------------------------------------- */
// Inline SVG path bodies (lucide, MIT). Rendered at 24×24 with currentColor.
const ICON_PATHS = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  refrigerator:
    '<path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M5 10h14"/><path d="M9 6v1"/><path d="M9 13v2"/>',
  'chef-hat':
    '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  monitor:
    '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'alert-triangle':
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  'play-circle': '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
  'check-circle': '<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>',
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
};

function icon(name, size = 18) {
  const body = ICON_PATHS[name] || '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/* ---------- 2. Data ----------------------------------------------------- */
const STRINGS = {
  brand: { name: 'renutri' },
  nav: {
    home: 'Início',
    pantry: 'Despensa',
    recipes: 'Receitas',
    contact: 'Fale Conosco',
    about: 'Sobre',
  },
  theme: { system: 'Sistema', light: 'Claro', dark: 'Escuro', sectionLabel: 'Tema' },
  footer: { legend: 'Feito com cuidado para reduzir o desperdício.' },
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
  pantry: {
    greetingMorning: 'Bom dia! Veja o que está na sua despensa.',
    greetingAfternoon: 'Boa tarde! Aqui está sua despensa.',
    greetingEvening: 'Boa noite! Confira o que precisa de atenção.',
    countSingular: '{n} alimento na despensa',
    countPlural: '{n} alimentos na despensa',
    searchPlaceholder: 'Buscar alimento…',
    addItemLabel: 'Adicionar alimento',
    emptyTitle: 'Sua despensa está vazia por enquanto.',
    emptyBody:
      'Adiciona o primeiro alimento e a gente cuida do resto — lembretes amigáveis, sugestões de receita, nada esquecido.',
    emptyCta: 'Adicionar o primeiro alimento',
    sortLabel: 'Ordenado por urgência',
    storedAtPrefix: 'Adicionado em',
    daysExpiredOne: 'Venceu ontem',
    daysExpiredMany: 'Venceu há {n} dias',
    daysToday: 'Vence hoje',
    daysTomorrow: 'Vence amanhã',
    daysFuture: 'Vence em {n} dias',
    viewRecipesHint: 'Ver receitas',
    modalTitle: 'Adicionar à despensa',
    fieldName: 'Nome do alimento',
    fieldNamePlaceholder: 'Ex: Tomate italiano',
    fieldCategory: 'Categoria',
    fieldExpires: 'Vence em',
    fieldShelf: 'Validade total (em dias)',
    fieldShelfHelper: 'Quantos dias o alimento dura na geladeira ou despensa, em média.',
    submit: 'Salvar alimento',
    cancel: 'Cancelar',
    validationName: 'Coloca o nome do alimento, por favor.',
    validationExpires: 'Escolhe uma data de validade.',
    validationShelf: 'A validade precisa ser pelo menos 1 dia.',
  },
  recipes: {
    title: 'Receitas para aproveitar',
    leadWithItems:
      'A gente priorizou as receitas que usam os alimentos mais perto do vencimento. Cozinha primeiro o que pede mais atenção!',
    leadEmpty: 'Aqui ficam as receitas que aproveitam o que está na sua despensa.',
    emptyTitle: 'Tudo fresquinho por aqui!',
    emptyBody:
      'Quando um ingrediente estiver chegando no vencimento, você vê aqui as receitas pra aproveitá-lo antes que vire desperdício.',
    suggestionCount: '{n} receitas sugeridas pra você',
    suggestionCountOne: '1 receita sugerida pra você',
    matchedPrefix: 'Usa o que você tem:',
    prepTime: '{n} min de preparo',
    cookTime: '{n} min de cozimento',
    servings: '{n} porções',
    servingsOne: '1 porção',
    urgentCritical: 'Aproveite logo!',
    viewRecipe: 'Ver receita',
    ingredientsTitle: 'Ingredientes',
    stepsTitle: 'Modo de preparo',
    itemModalTitle: 'Receitas com {item}',
    itemModalLead: 'Que tal aproveitar esse ingrediente em uma dessas receitas?',
    itemModalCountOne: '1 receita encontrada',
    itemModalCount: '{n} receitas encontradas',
    itemModalEmptyTitle: 'Nenhuma receita com esse ingrediente, por enquanto.',
    itemModalEmptyBody:
      'A gente ainda não tem uma receita que usa esse item — mas você pode explorar todas na aba Receitas.',
  },
  contact: {
    title: 'Fale Conosco',
    lead: 'Tem uma sugestão, encontrou um problema ou quer falar de parceria? A gente adora ouvir você.',
    name: 'Seu nome',
    namePlaceholder: 'Como podemos te chamar?',
    email: 'Seu e-mail',
    emailPlaceholder: 'voce@exemplo.com',
    subject: 'Assunto',
    message: 'Mensagem',
    messagePlaceholder: 'Conta pra gente o que você está pensando…',
    vName: 'Coloca seu nome, por favor.',
    vEmail: 'Confere o e-mail — parece que falta algo.',
    vMessage: 'Conta um pouco mais na mensagem (mínimo 10 caracteres).',
    submit: 'Enviar mensagem',
    successTitle: 'Mensagem enviada!',
    successBody: 'Obrigado por falar com a gente. Vamos responder em breve no seu e-mail.',
    successAgain: 'Enviar outra mensagem',
    subjects: {
      suggestion: 'Sugestão',
      bug: 'Reportar um problema',
      partnership: 'Parceria',
      other: 'Outro',
    },
  },
};

const PITCH_VIDEO_URL = 'https://youtu.be/PITCH-VIDEO-PLACEHOLDER';

const FOOD_LABELS = {
  vegetable: 'Verdura',
  fruit: 'Fruta',
  dairy: 'Laticínio',
  protein: 'Proteína',
  grain: 'Grão',
  'pantry-staple': 'Despensa',
  beverage: 'Bebida',
  other: 'Outro',
};
const FOOD_OPTIONS = Object.keys(FOOD_LABELS);

const CUISINE_LABELS = {
  'main-dish': 'Prato principal',
  'salad-side': 'Salada e acompanhamento',
  soup: 'Sopa',
  breakfast: 'Café da manhã',
  snack: 'Lanche',
  dessert: 'Sobremesa',
};

const RIPENESS_LABELS = {
  fresh: 'verdinho',
  peak: 'maduro',
  aging: 'atenção',
  critical: 'use já',
  spoiled: 'estragado',
};

// Urgency weight per ripeness stop — drives recipe ranking. A recipe using
// items that are about to expire outranks one using only fresh items.
const RIPENESS_URGENCY = { fresh: 0.5, peak: 1, aging: 2, critical: 4, spoiled: -1 };

const CONTACT_SUBJECTS = ['suggestion', 'bug', 'partnership', 'other'];

// 50 everyday pt-BR recipes, skewed toward perishable ingredients so the
// "aproveitar" suggestions stay meaningful.
const RECIPES = [
  { id: 'r-001', title: 'Refogado de tomate com alho', description: 'Um refogado simples e rápido, perfeito pra aproveitar tomates maduros.', prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 2, category: 'salad-side', ingredients: [{ name: 'Tomate', aliases: ['tomate italiano', 'tomate cereja'], amount: '4 unidades' }, { name: 'Alho', amount: '2 dentes' }, { name: 'Cebola', amount: '1 unidade' }, { name: 'Azeite', amount: '2 colheres de sopa', optional: true }], steps: ['Pique a cebola e o alho bem fininhos.', 'Refogue no azeite até dourar.', 'Junte os tomates picados e cozinhe em fogo baixo por 10 minutos.', 'Tempere com sal e sirva quente.'] },
  { id: 'r-002', title: 'Omelete de queijo e cebolinha', description: 'Café da manhã proteico em menos de 10 minutos.', prepTimeMinutes: 5, cookTimeMinutes: 5, servings: 1, category: 'breakfast', ingredients: [{ name: 'Ovo', amount: '3 unidades' }, { name: 'Queijo', aliases: ['queijo muçarela', 'queijo prato'], amount: '50g' }, { name: 'Cebolinha', amount: 'a gosto', optional: true }], steps: ['Bata os ovos com uma pitada de sal.', 'Despeje numa frigideira antiaderente quente.', 'Adicione o queijo e a cebolinha por cima.', 'Dobre ao meio quando firmar e sirva.'] },
  { id: 'r-003', title: 'Salada de alface, tomate e cenoura', description: 'A salada clássica do almoço brasileiro, fresquinha.', prepTimeMinutes: 10, cookTimeMinutes: 0, servings: 4, category: 'salad-side', ingredients: [{ name: 'Alface', aliases: ['alface americana', 'alface crespa'], amount: '1/2 pé' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Cenoura', amount: '1 unidade' }, { name: 'Limão', amount: '1/2 unidade', optional: true }], steps: ['Lave e rasgue a alface em pedaços.', 'Corte os tomates em rodelas e rale a cenoura.', 'Misture tudo numa tigela.', 'Tempere com sal, azeite e limão a gosto.'] },
  { id: 'r-004', title: 'Sopa de legumes', description: 'Aproveite os legumes que estão de vez numa sopa reconfortante.', prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4, category: 'soup', ingredients: [{ name: 'Batata', amount: '2 unidades' }, { name: 'Cenoura', amount: '2 unidades' }, { name: 'Abobrinha', amount: '1 unidade' }, { name: 'Cebola', amount: '1 unidade' }, { name: 'Caldo de legumes', amount: '1 litro', optional: true }], steps: ['Descasque e pique todos os legumes.', 'Refogue a cebola numa panela grande.', 'Junte os legumes e cubra com o caldo.', 'Cozinhe por 30 minutos e amasse levemente antes de servir.'] },
  { id: 'r-005', title: 'Banana amassada com aveia', description: 'Pra aproveitar bananas bem maduras no café da manhã.', prepTimeMinutes: 5, cookTimeMinutes: 0, servings: 1, category: 'breakfast', ingredients: [{ name: 'Banana', aliases: ['banana prata', 'banana nanica'], amount: '2 unidades' }, { name: 'Aveia', amount: '3 colheres de sopa' }, { name: 'Mel', amount: 'a gosto', optional: true }], steps: ['Amasse as bananas maduras com um garfo.', 'Misture a aveia até dar liga.', 'Adicione mel se quiser adoçar.', 'Sirva imediatamente.'] },
  { id: 'r-006', title: 'Frango grelhado com limão', description: 'Proteína simples pro almoço, suculenta e leve.', prepTimeMinutes: 10, cookTimeMinutes: 20, servings: 2, category: 'main-dish', ingredients: [{ name: 'Frango', aliases: ['peito de frango', 'filé de frango'], amount: '2 filés' }, { name: 'Limão', amount: '1 unidade' }, { name: 'Alho', amount: '2 dentes' }], steps: ['Tempere o frango com suco de limão, alho e sal.', 'Deixe marinar por 15 minutos.', 'Grelhe em fogo médio por 10 minutos de cada lado.', 'Sirva com salada ou arroz.'] },
  { id: 'r-007', title: 'Purê de batata cremoso', description: 'O acompanhamento que combina com tudo.', prepTimeMinutes: 10, cookTimeMinutes: 20, servings: 4, category: 'salad-side', ingredients: [{ name: 'Batata', amount: '500g' }, { name: 'Leite', amount: '100ml' }, { name: 'Manteiga', amount: '2 colheres de sopa' }], steps: ['Cozinhe as batatas até ficarem macias.', 'Amasse ainda quentes.', 'Misture o leite e a manteiga aos poucos.', 'Tempere com sal e mexa até ficar cremoso.'] },
  { id: 'r-008', title: 'Vitamina de banana e mamão', description: 'Aproveite frutas maduras numa vitamina nutritiva.', prepTimeMinutes: 5, cookTimeMinutes: 0, servings: 2, category: 'breakfast', ingredients: [{ name: 'Banana', amount: '1 unidade' }, { name: 'Mamão', amount: '1/2 unidade' }, { name: 'Leite', amount: '300ml' }], steps: ['Corte as frutas em pedaços.', 'Bata tudo no liquidificador com o leite.', 'Adoce a gosto.', 'Sirva gelado.'] },
  { id: 'r-009', title: 'Arroz de forno com queijo', description: 'Transforme o arroz que sobrou num prato novo.', prepTimeMinutes: 10, cookTimeMinutes: 25, servings: 4, category: 'main-dish', ingredients: [{ name: 'Arroz', aliases: ['arroz cozido'], amount: '2 xícaras' }, { name: 'Queijo', amount: '100g' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Ovo', amount: '2 unidades' }], steps: ['Misture o arroz cozido com os ovos batidos.', 'Coloque metade num refratário.', 'Adicione tomate e queijo, e cubra com o resto do arroz.', 'Leve ao forno por 25 minutos até gratinar.'] },
  { id: 'r-010', title: 'Creme de abóbora', description: 'Um creme aveludado pra aproveitar abóbora madura.', prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4, category: 'soup', ingredients: [{ name: 'Abóbora', aliases: ['abóbora cabotiá', 'moranga'], amount: '500g' }, { name: 'Cebola', amount: '1 unidade' }, { name: 'Alho', amount: '2 dentes' }, { name: 'Gengibre', amount: '1 pedaço pequeno', optional: true }], steps: ['Refogue a cebola e o alho.', 'Junte a abóbora picada e cubra com água.', 'Cozinhe até amaciar e bata no liquidificador.', 'Volte à panela, ajuste o sal e sirva.'] },
  { id: 'r-011', title: 'Macarrão alho e óleo', description: 'Rápido, barato e sempre salva o jantar.', prepTimeMinutes: 5, cookTimeMinutes: 15, servings: 2, category: 'main-dish', ingredients: [{ name: 'Macarrão', amount: '250g' }, { name: 'Alho', amount: '4 dentes' }, { name: 'Azeite', amount: '3 colheres de sopa' }, { name: 'Salsinha', amount: 'a gosto', optional: true }], steps: ['Cozinhe o macarrão al dente.', 'Doure o alho fatiado no azeite em fogo baixo.', 'Junte o macarrão escorrido e misture bem.', 'Finalize com salsinha e sirva.'] },
  { id: 'r-012', title: 'Escondidinho de carne moída', description: 'Aproveite a carne moída numa receita reconfortante.', prepTimeMinutes: 20, cookTimeMinutes: 30, servings: 4, category: 'main-dish', ingredients: [{ name: 'Carne moída', aliases: ['carne'], amount: '500g' }, { name: 'Batata', amount: '600g' }, { name: 'Cebola', amount: '1 unidade' }, { name: 'Tomate', amount: '2 unidades' }], steps: ['Refogue a carne com cebola e tomate.', 'Cozinhe e amasse as batatas em purê.', 'Monte em camadas num refratário.', 'Leve ao forno por 20 minutos.'] },
  { id: 'r-013', title: 'Salada de grão-de-bico', description: 'Proteína vegetal num prato refrescante.', prepTimeMinutes: 15, cookTimeMinutes: 0, servings: 4, category: 'salad-side', ingredients: [{ name: 'Grão-de-bico', aliases: ['grão de bico'], amount: '2 xícaras cozidas' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Cebola roxa', amount: '1/2 unidade' }, { name: 'Salsinha', amount: 'a gosto', optional: true }], steps: ['Escorra o grão-de-bico cozido.', 'Pique o tomate e a cebola roxa.', 'Misture tudo numa tigela.', 'Tempere com azeite, limão e sal.'] },
  { id: 'r-014', title: 'Panqueca de banana', description: 'Café da manhã saudável com bananas maduras.', prepTimeMinutes: 5, cookTimeMinutes: 10, servings: 2, category: 'breakfast', ingredients: [{ name: 'Banana', amount: '2 unidades' }, { name: 'Ovo', amount: '2 unidades' }, { name: 'Aveia', amount: '4 colheres de sopa' }], steps: ['Amasse as bananas e misture os ovos.', 'Junte a aveia até dar consistência.', 'Frite pequenas porções numa frigideira.', 'Sirva com mel ou frutas.'] },
  { id: 'r-015', title: 'Refogado de abobrinha', description: 'Acompanhamento leve pra aproveitar abobrinha de vez.', prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 3, category: 'salad-side', ingredients: [{ name: 'Abobrinha', amount: '2 unidades' }, { name: 'Alho', amount: '2 dentes' }, { name: 'Cebola', amount: '1 unidade' }], steps: ['Corte a abobrinha em meia-lua.', 'Refogue a cebola e o alho.', 'Junte a abobrinha e cozinhe por 10 minutos.', 'Tempere e sirva.'] },
  { id: 'r-016', title: 'Sopa de cebola gratinada', description: 'Aproveite cebolas numa sopa quentinha e gratinada.', prepTimeMinutes: 15, cookTimeMinutes: 40, servings: 4, category: 'soup', ingredients: [{ name: 'Cebola', amount: '4 unidades' }, { name: 'Queijo', amount: '100g' }, { name: 'Pão', aliases: ['pão amanhecido', 'pão de forma'], amount: '4 fatias' }], steps: ['Fatie as cebolas e doure lentamente.', 'Cubra com água ou caldo e cozinhe.', 'Sirva com pão torrado e queijo por cima.', 'Gratine no forno por 10 minutos.'] },
  { id: 'r-017', title: 'Iogurte com frutas e granola', description: 'Lanche rápido pra aproveitar iogurte e frutas.', prepTimeMinutes: 5, cookTimeMinutes: 0, servings: 1, category: 'snack', ingredients: [{ name: 'Iogurte', aliases: ['iogurte natural'], amount: '1 pote' }, { name: 'Banana', amount: '1 unidade' }, { name: 'Granola', amount: '2 colheres de sopa', optional: true }], steps: ['Coloque o iogurte numa tigela.', 'Adicione a banana fatiada.', 'Cubra com granola.', 'Sirva na hora.'] },
  { id: 'r-018', title: 'Bolinho de arroz', description: 'Aproveite o arroz que sobrou em bolinhos crocantes.', prepTimeMinutes: 15, cookTimeMinutes: 15, servings: 4, category: 'snack', ingredients: [{ name: 'Arroz', amount: '2 xícaras cozidas' }, { name: 'Ovo', amount: '1 unidade' }, { name: 'Queijo', amount: '50g' }, { name: 'Farinha de trigo', amount: '3 colheres de sopa' }], steps: ['Misture o arroz com ovo, queijo e farinha.', 'Modele bolinhos com as mãos.', 'Frite em óleo quente até dourar.', 'Escorra em papel toalha e sirva.'] },
  { id: 'r-019', title: 'Salada de repolho com cenoura', description: 'Aquela salada de coleslaw pra aproveitar repolho.', prepTimeMinutes: 15, cookTimeMinutes: 0, servings: 4, category: 'salad-side', ingredients: [{ name: 'Repolho', amount: '1/2 unidade' }, { name: 'Cenoura', amount: '2 unidades' }, { name: 'Maionese', amount: '3 colheres de sopa', optional: true }], steps: ['Fatie o repolho bem fininho.', 'Rale a cenoura.', 'Misture com a maionese.', 'Tempere e leve à geladeira antes de servir.'] },
  { id: 'r-020', title: 'Ovos mexidos com tomate', description: 'Café da manhã proteico pra aproveitar tomates.', prepTimeMinutes: 5, cookTimeMinutes: 10, servings: 2, category: 'breakfast', ingredients: [{ name: 'Ovo', amount: '4 unidades' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Cebolinha', amount: 'a gosto', optional: true }], steps: ['Refogue o tomate picado.', 'Junte os ovos batidos.', 'Mexa em fogo baixo até firmar.', 'Finalize com cebolinha.'] },
  { id: 'r-021', title: 'Strogonoff de frango', description: 'Clássico cremoso pra aproveitar o frango.', prepTimeMinutes: 15, cookTimeMinutes: 25, servings: 4, category: 'main-dish', ingredients: [{ name: 'Frango', amount: '500g' }, { name: 'Creme de leite', amount: '1 caixa' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Cebola', amount: '1 unidade' }], steps: ['Corte o frango em cubos e refogue.', 'Junte cebola e tomate.', 'Adicione molho de tomate e cozinhe.', 'Desligue o fogo e misture o creme de leite.'] },
  { id: 'r-022', title: 'Suco verde detox', description: 'Aproveite folhas e frutas num suco refrescante.', prepTimeMinutes: 5, cookTimeMinutes: 0, servings: 2, category: 'breakfast', ingredients: [{ name: 'Couve', amount: '2 folhas' }, { name: 'Limão', amount: '1 unidade' }, { name: 'Maçã', amount: '1 unidade' }], steps: ['Lave bem a couve.', 'Bata tudo no liquidificador com água.', 'Coe se preferir.', 'Sirva gelado.'] },
  { id: 'r-023', title: 'Berinjela refogada', description: 'Aproveite berinjela madura num refogado saboroso.', prepTimeMinutes: 10, cookTimeMinutes: 20, servings: 3, category: 'salad-side', ingredients: [{ name: 'Berinjela', amount: '2 unidades' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Alho', amount: '3 dentes' }], steps: ['Corte a berinjela em cubos.', 'Refogue com alho até amaciar.', 'Junte o tomate picado.', 'Cozinhe por 10 minutos e tempere.'] },
  { id: 'r-024', title: 'Canja de galinha', description: 'Sopa reconfortante pra aproveitar frango e arroz.', prepTimeMinutes: 15, cookTimeMinutes: 35, servings: 4, category: 'soup', ingredients: [{ name: 'Frango', amount: '300g' }, { name: 'Arroz', amount: '1/2 xícara' }, { name: 'Cenoura', amount: '1 unidade' }, { name: 'Cebola', amount: '1 unidade' }], steps: ['Cozinhe o frango e desfie.', 'No caldo, junte arroz e cenoura.', 'Cozinhe até o arroz amaciar.', 'Volte o frango, ajuste o sal e sirva.'] },
  { id: 'r-025', title: 'Torta de legumes', description: 'Aproveite vários legumes numa torta salgada.', prepTimeMinutes: 20, cookTimeMinutes: 40, servings: 6, category: 'main-dish', ingredients: [{ name: 'Cenoura', amount: '1 unidade' }, { name: 'Abobrinha', amount: '1 unidade' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Ovo', amount: '3 unidades' }, { name: 'Farinha de trigo', amount: '2 xícaras' }], steps: ['Bata os ingredientes líquidos no liquidificador.', 'Misture a farinha e o fermento.', 'Adicione os legumes picados.', 'Asse por 40 minutos a 180°C.'] },
  { id: 'r-026', title: 'Maçã assada com canela', description: 'Sobremesa simples pra aproveitar maçãs.', prepTimeMinutes: 5, cookTimeMinutes: 25, servings: 2, category: 'dessert', ingredients: [{ name: 'Maçã', amount: '2 unidades' }, { name: 'Canela', amount: 'a gosto' }, { name: 'Mel', amount: '2 colheres de sopa', optional: true }], steps: ['Retire o miolo das maçãs.', 'Recheie com mel e canela.', 'Asse por 25 minutos.', 'Sirva morna.'] },
  { id: 'r-027', title: 'Quiche de queijo e tomate', description: 'Aproveite queijo e tomate numa quiche dourada.', prepTimeMinutes: 20, cookTimeMinutes: 35, servings: 6, category: 'main-dish', ingredients: [{ name: 'Queijo', amount: '150g' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Ovo', amount: '3 unidades' }, { name: 'Creme de leite', amount: '1 caixa' }], steps: ['Forre uma forma com massa.', 'Bata ovos com creme de leite.', 'Espalhe queijo e tomate sobre a massa.', 'Despeje o creme e asse por 35 minutos.'] },
  { id: 'r-028', title: 'Salada de batata', description: 'Aproveite batatas num acompanhamento cremoso.', prepTimeMinutes: 15, cookTimeMinutes: 20, servings: 4, category: 'salad-side', ingredients: [{ name: 'Batata', amount: '500g' }, { name: 'Ovo', amount: '2 unidades' }, { name: 'Maionese', amount: '3 colheres de sopa', optional: true }], steps: ['Cozinhe as batatas em cubos.', 'Cozinhe os ovos e pique.', 'Misture tudo com a maionese.', 'Tempere e leve à geladeira.'] },
  { id: 'r-029', title: 'Smoothie de morango', description: 'Aproveite morangos maduros num smoothie cremoso.', prepTimeMinutes: 5, cookTimeMinutes: 0, servings: 2, category: 'breakfast', ingredients: [{ name: 'Morango', amount: '1 xícara' }, { name: 'Iogurte', amount: '1 pote' }, { name: 'Banana', amount: '1 unidade' }], steps: ['Higienize os morangos.', 'Bata tudo no liquidificador.', 'Adoce a gosto.', 'Sirva gelado.'] },
  { id: 'r-030', title: 'Frango xadrez', description: 'Aproveite frango e pimentões num prato colorido.', prepTimeMinutes: 15, cookTimeMinutes: 20, servings: 4, category: 'main-dish', ingredients: [{ name: 'Frango', amount: '500g' }, { name: 'Pimentão', amount: '2 unidades' }, { name: 'Cebola', amount: '1 unidade' }, { name: 'Tomate', amount: '1 unidade' }], steps: ['Corte o frango em cubos e doure.', 'Junte os pimentões e a cebola em pedaços.', 'Adicione o tomate e refogue.', 'Tempere com shoyu e sirva com arroz.'] },
  { id: 'r-031', title: 'Caldo verde', description: 'Aproveite couve e batata num caldo cremoso.', prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4, category: 'soup', ingredients: [{ name: 'Couve', amount: '4 folhas' }, { name: 'Batata', amount: '500g' }, { name: 'Linguiça', amount: '200g', optional: true }, { name: 'Alho', amount: '2 dentes' }], steps: ['Cozinhe e bata as batatas em creme.', 'Refogue o alho e a linguiça.', 'Junte o creme de batata.', 'Adicione a couve fatiada e sirva quente.'] },
  { id: 'r-032', title: 'Wrap de alface e frango', description: 'Lanche leve pra aproveitar alface e frango.', prepTimeMinutes: 10, cookTimeMinutes: 0, servings: 2, category: 'snack', ingredients: [{ name: 'Alface', amount: '4 folhas' }, { name: 'Frango', aliases: ['frango desfiado'], amount: '200g' }, { name: 'Tomate', amount: '1 unidade' }, { name: 'Tortilha', amount: '2 unidades', optional: true }], steps: ['Espalhe o frango desfiado na tortilha.', 'Adicione alface e tomate.', 'Enrole bem firme.', 'Corte ao meio e sirva.'] },
  { id: 'r-033', title: 'Mingau de aveia com banana', description: 'Café da manhã quentinho pra aproveitar banana.', prepTimeMinutes: 5, cookTimeMinutes: 10, servings: 2, category: 'breakfast', ingredients: [{ name: 'Aveia', amount: '1 xícara' }, { name: 'Leite', amount: '500ml' }, { name: 'Banana', amount: '1 unidade' }], steps: ['Aqueça o leite com a aveia.', 'Mexa até engrossar.', 'Adicione a banana amassada.', 'Sirva com canela.'] },
  { id: 'r-034', title: 'Pão de queijo de frigideira', description: 'Lanche rápido pra aproveitar queijo e ovo.', prepTimeMinutes: 5, cookTimeMinutes: 10, servings: 1, category: 'snack', ingredients: [{ name: 'Queijo', amount: '50g' }, { name: 'Ovo', amount: '1 unidade' }, { name: 'Polvilho', amount: '3 colheres de sopa' }], steps: ['Misture todos os ingredientes.', 'Despeje numa frigideira untada.', 'Cozinhe dos dois lados.', 'Sirva quente.'] },
  { id: 'r-035', title: 'Ratatouille', description: 'Aproveite vários legumes num refogado provençal.', prepTimeMinutes: 20, cookTimeMinutes: 35, servings: 4, category: 'main-dish', ingredients: [{ name: 'Berinjela', amount: '1 unidade' }, { name: 'Abobrinha', amount: '1 unidade' }, { name: 'Pimentão', amount: '1 unidade' }, { name: 'Tomate', amount: '3 unidades' }], steps: ['Corte todos os legumes em rodelas.', 'Disponha em camadas num refratário.', 'Regue com azeite e ervas.', 'Asse por 35 minutos.'] },
  { id: 'r-036', title: 'Salada caprese', description: 'Aproveite tomate e queijo numa salada italiana.', prepTimeMinutes: 10, cookTimeMinutes: 0, servings: 2, category: 'salad-side', ingredients: [{ name: 'Tomate', amount: '3 unidades' }, { name: 'Queijo', aliases: ['muçarela de búfala', 'queijo muçarela'], amount: '150g' }, { name: 'Manjericão', amount: 'a gosto', optional: true }], steps: ['Corte o tomate e o queijo em rodelas.', 'Intercale num prato.', 'Adicione folhas de manjericão.', 'Regue com azeite e sal.'] },
  { id: 'r-037', title: 'Sopa de mandioquinha', description: 'Creme aveludado pra aproveitar mandioquinha.', prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4, category: 'soup', ingredients: [{ name: 'Mandioquinha', aliases: ['batata baroa'], amount: '500g' }, { name: 'Cebola', amount: '1 unidade' }, { name: 'Alho', amount: '2 dentes' }], steps: ['Refogue cebola e alho.', 'Junte a mandioquinha e cubra com água.', 'Cozinhe e bata até cremoso.', 'Ajuste o sal e sirva.'] },
  { id: 'r-038', title: 'Tapioca de queijo', description: 'Lanche rápido pra aproveitar queijo.', prepTimeMinutes: 5, cookTimeMinutes: 5, servings: 1, category: 'snack', ingredients: [{ name: 'Goma de tapioca', amount: '3 colheres de sopa' }, { name: 'Queijo', amount: '50g' }], steps: ['Espalhe a goma na frigideira quente.', 'Quando firmar, adicione o queijo.', 'Dobre ao meio.', 'Sirva quente.'] },
  { id: 'r-039', title: 'Salada de pepino com iogurte', description: 'Aproveite pepino numa salada refrescante.', prepTimeMinutes: 10, cookTimeMinutes: 0, servings: 4, category: 'salad-side', ingredients: [{ name: 'Pepino', amount: '2 unidades' }, { name: 'Iogurte', amount: '1 pote' }, { name: 'Alho', amount: '1 dente' }], steps: ['Fatie o pepino fininho.', 'Misture o iogurte com alho amassado.', 'Junte o pepino.', 'Tempere com sal e hortelã.'] },
  { id: 'r-040', title: 'Banana caramelizada', description: 'Sobremesa expressa pra aproveitar bananas maduras.', prepTimeMinutes: 5, cookTimeMinutes: 10, servings: 2, category: 'dessert', ingredients: [{ name: 'Banana', amount: '3 unidades' }, { name: 'Açúcar', amount: '3 colheres de sopa' }, { name: 'Canela', amount: 'a gosto', optional: true }], steps: ['Corte as bananas ao meio.', 'Polvilhe açúcar numa frigideira.', 'Doure as bananas dos dois lados.', 'Sirva com canela.'] },
  { id: 'r-041', title: 'Omelete de espinafre', description: 'Aproveite espinafre num café da manhã nutritivo.', prepTimeMinutes: 5, cookTimeMinutes: 10, servings: 1, category: 'breakfast', ingredients: [{ name: 'Espinafre', amount: '1 maço' }, { name: 'Ovo', amount: '3 unidades' }, { name: 'Queijo', amount: '30g', optional: true }], steps: ['Refogue o espinafre rapidamente.', 'Junte os ovos batidos.', 'Cozinhe até firmar.', 'Dobre e sirva.'] },
  { id: 'r-042', title: 'Risoto de legumes', description: 'Aproveite legumes variados num risoto cremoso.', prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4, category: 'main-dish', ingredients: [{ name: 'Arroz', aliases: ['arroz arbóreo'], amount: '2 xícaras' }, { name: 'Abobrinha', amount: '1 unidade' }, { name: 'Cenoura', amount: '1 unidade' }, { name: 'Cebola', amount: '1 unidade' }], steps: ['Refogue a cebola e o arroz.', 'Adicione caldo aos poucos, mexendo.', 'Junte os legumes picados.', 'Finalize com queijo e sirva.'] },
  { id: 'r-043', title: 'Creme de espinafre', description: 'Acompanhamento cremoso pra aproveitar espinafre.', prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 4, category: 'salad-side', ingredients: [{ name: 'Espinafre', amount: '2 maços' }, { name: 'Creme de leite', amount: '1 caixa' }, { name: 'Alho', amount: '2 dentes' }], steps: ['Refogue o alho e o espinafre.', 'Bata no liquidificador.', 'Volte à panela com o creme de leite.', 'Aqueça e sirva.'] },
  { id: 'r-044', title: 'Pizza de frigideira', description: 'Aproveite queijo e tomate numa pizza rápida.', prepTimeMinutes: 10, cookTimeMinutes: 15, servings: 2, category: 'main-dish', ingredients: [{ name: 'Queijo', amount: '100g' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Farinha de trigo', amount: '1 xícara' }, { name: 'Ovo', amount: '1 unidade' }], steps: ['Faça uma massa com farinha, ovo e água.', 'Espalhe na frigideira.', 'Cubra com tomate e queijo.', 'Tampe e cozinhe até derreter.'] },
  { id: 'r-045', title: 'Suco de laranja com cenoura', description: 'Aproveite laranja e cenoura num suco vitaminado.', prepTimeMinutes: 5, cookTimeMinutes: 0, servings: 2, category: 'breakfast', ingredients: [{ name: 'Laranja', amount: '4 unidades' }, { name: 'Cenoura', amount: '1 unidade' }], steps: ['Esprema as laranjas.', 'Bata o suco com a cenoura.', 'Coe se preferir.', 'Sirva gelado.'] },
  { id: 'r-046', title: 'Abóbora refogada com carne', description: 'Aproveite abóbora e carne num prato único.', prepTimeMinutes: 15, cookTimeMinutes: 30, servings: 4, category: 'main-dish', ingredients: [{ name: 'Abóbora', amount: '500g' }, { name: 'Carne moída', amount: '300g' }, { name: 'Cebola', amount: '1 unidade' }, { name: 'Alho', amount: '2 dentes' }], steps: ['Refogue a carne com cebola e alho.', 'Junte a abóbora em cubos.', 'Cozinhe até amaciar.', 'Tempere com cheiro-verde e sirva.'] },
  { id: 'r-047', title: 'Salada de manga com rúcula', description: 'Aproveite manga madura numa salada agridoce.', prepTimeMinutes: 10, cookTimeMinutes: 0, servings: 2, category: 'salad-side', ingredients: [{ name: 'Manga', amount: '1 unidade' }, { name: 'Rúcula', amount: '1 maço' }, { name: 'Limão', amount: '1/2 unidade', optional: true }], steps: ['Corte a manga em cubos.', 'Misture com a rúcula.', 'Tempere com limão e azeite.', 'Sirva imediatamente.'] },
  { id: 'r-048', title: 'Creme de milho', description: 'Acompanhamento doce e cremoso pra aproveitar milho.', prepTimeMinutes: 10, cookTimeMinutes: 20, servings: 4, category: 'salad-side', ingredients: [{ name: 'Milho', amount: '2 espigas' }, { name: 'Leite', amount: '200ml' }, { name: 'Cebola', amount: '1/2 unidade' }], steps: ['Debulhe o milho.', 'Bata com o leite no liquidificador.', 'Leve ao fogo com a cebola refogada.', 'Mexa até engrossar e sirva.'] },
  { id: 'r-049', title: 'Pudim de pão', description: 'Aproveite pão amanhecido numa sobremesa econômica.', prepTimeMinutes: 15, cookTimeMinutes: 40, servings: 6, category: 'dessert', ingredients: [{ name: 'Pão', aliases: ['pão amanhecido', 'pão francês'], amount: '4 unidades' }, { name: 'Leite', amount: '500ml' }, { name: 'Ovo', amount: '3 unidades' }, { name: 'Açúcar', amount: '1 xícara' }], steps: ['Amoleça o pão no leite.', 'Bata com ovos e açúcar.', 'Despeje numa forma caramelizada.', 'Asse em banho-maria por 40 minutos.'] },
  { id: 'r-050', title: 'Salada de feijão-fradinho', description: 'Aproveite feijão e tomate numa salada proteica.', prepTimeMinutes: 15, cookTimeMinutes: 0, servings: 4, category: 'salad-side', ingredients: [{ name: 'Feijão-fradinho', aliases: ['feijão fradinho'], amount: '2 xícaras cozidas' }, { name: 'Tomate', amount: '2 unidades' }, { name: 'Cebola', amount: '1 unidade' }, { name: 'Pimentão', amount: '1 unidade', optional: true }], steps: ['Escorra o feijão cozido.', 'Pique tomate, cebola e pimentão.', 'Misture tudo.', 'Tempere com azeite, vinagre e sal.'] },
];

/* ---------- 3. Domain (pure functions) ---------------------------------- */
const MS_PER_DAY = 86_400_000;

// Calendar-day difference in local time (mirrors date-fns differenceInCalendarDays):
// strips the time component so "1 hour to midnight" doesn't flip a day.
function differenceInCalendarDays(later, earlier) {
  const a = new Date(later.getFullYear(), later.getMonth(), later.getDate());
  const b = new Date(earlier.getFullYear(), earlier.getMonth(), earlier.getDate());
  return Math.round((a - b) / MS_PER_DAY);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDateBR(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${date.getFullYear()}`;
}

// Ripeness stop from days-to-expiry (brand doc §6):
//   spoiled (past) · critical (0–1) · aging (2–3) · peak (4–7) · fresh (>7)
function computeRipeness(expiresAt, now) {
  const days = differenceInCalendarDays(expiresAt, now);
  if (days < 0) return 'spoiled';
  if (days <= 1) return 'critical';
  if (days <= 3) return 'aging';
  if (days <= 7) return 'peak';
  return 'fresh';
}

function ingredientMatchesItem(ingredient, itemName) {
  const itemLower = itemName.toLowerCase();
  const candidates = [ingredient.name, ...(ingredient.aliases || [])].map((s) => s.toLowerCase());
  return candidates.some((c) => itemLower.includes(c) || c.includes(itemLower));
}

// Score a recipe by summing the urgency of the pantry items it consumes.
function scoreRecipe(recipe, pantryInputs) {
  const matched = [];
  let score = 0;
  for (const ingredient of recipe.ingredients) {
    if (ingredient.optional) continue;
    const hit = pantryInputs.find((input) => ingredientMatchesItem(ingredient, input.name));
    if (hit) {
      matched.push(ingredient.name);
      score += hit.ripenessScore;
    }
  }
  return { recipe, score, matchedIngredients: matched };
}

function rankRecipes(pantryInputs) {
  return RECIPES.map((recipe) => scoreRecipe(recipe, pantryInputs))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);
}

function recipesForIngredient(itemName) {
  return RECIPES.filter((recipe) =>
    recipe.ingredients.some((ing) => !ing.optional && ingredientMatchesItem(ing, itemName)),
  );
}

/* ---------- 4. Persistence ---------------------------------------------- */
const STORAGE_KEY = 'pantry.items.v1';

function uuid() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Five demo items spanning all ripeness stops, so the first load shows the
// full colour gradient instead of an empty list.
function buildDemoSeed() {
  const now = new Date();
  const iso = (d) => d.toISOString();
  return [
    { id: uuid(), name: 'Alface americana', category: 'vegetable', storedAt: iso(addDays(now, -1)), expiresAt: iso(addDays(now, 10)), shelfLifeDays: 11 },
    { id: uuid(), name: 'Iogurte natural', category: 'dairy', storedAt: iso(addDays(now, -8)), expiresAt: iso(addDays(now, 6)), shelfLifeDays: 14 },
    { id: uuid(), name: 'Tomate italiano', category: 'vegetable', storedAt: iso(addDays(now, -4)), expiresAt: iso(addDays(now, 3)), shelfLifeDays: 7 },
    { id: uuid(), name: 'Banana prata', category: 'fruit', storedAt: iso(addDays(now, -5)), expiresAt: iso(addDays(now, 1)), shelfLifeDays: 6 },
    { id: uuid(), name: 'Pão de forma integral', category: 'grain', storedAt: iso(addDays(now, -10)), expiresAt: iso(addDays(now, -2)), shelfLifeDays: 8 },
  ];
}

function readPantry() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      const seeded = { version: 1, items: buildDemoSeed() };
      writePantry(seeded.items);
      return seeded.items;
    }
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1 || !Array.isArray(parsed.items)) return [];
    return parsed.items;
  } catch (e) {
    return [];
  }
}

function writePantry(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, items }));
  } catch (e) {
    /* storage full / disabled — the UI degrades gracefully */
  }
}

function addPantryItem(item) {
  const items = readPantry();
  items.push(item);
  writePantry(items);
}

function removePantryItem(id) {
  writePantry(readPantry().filter((item) => item.id !== id));
}

/* ---------- 5. Helpers -------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);

// HTML-escape every dynamic value before it enters an innerHTML template.
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] != null ? vars[key] : ''));
}

/* ---------- 6. Theme ---------------------------------------------------- */
const THEME_KEY = 'theme';

function readThemeMode() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch (e) {
    /* ignore */
  }
  return 'system';
}

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'dark') return root.setAttribute('data-theme', 'dark');
  if (mode === 'light') return root.removeAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
}

function setThemeMode(mode) {
  applyTheme(mode);
  try {
    localStorage.setItem(THEME_KEY, mode);
  } catch (e) {
    /* ignore */
  }
  renderThemeToggle();
}

function themeToggleHtml() {
  const mode = readThemeMode();
  const opt = (value, iconName, label) =>
    `<button type="button" role="radio" aria-checked="${mode === value}" class="theme-option" data-theme-mode="${value}">${icon(iconName, 16)}<span class="theme-label">${label}</span></button>`;
  return (
    `<div class="theme-toggle" role="radiogroup" aria-label="${STRINGS.theme.sectionLabel}">` +
    opt('system', 'monitor', STRINGS.theme.system) +
    opt('light', 'sun', STRINGS.theme.light) +
    opt('dark', 'moon', STRINGS.theme.dark) +
    `</div>`
  );
}

function renderThemeToggle() {
  const slot = $('#theme-slot');
  if (slot) slot.innerHTML = themeToggleHtml();
}

// Follow the OS while in system mode.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (readThemeMode() === 'system') applyTheme('system');
});

/* ---------- 7. Modals (stackable overlay) ------------------------------- */
// Each stack entry is { html: () => string, wire?: (root) => void }. Opening
// a recipe from the per-item modal pushes a second layer; closing pops back.
const modalStack = [];

function renderModal() {
  const root = $('#modal-root');
  if (!modalStack.length) {
    root.hidden = true;
    root.innerHTML = '';
    return;
  }
  const top = modalStack[modalStack.length - 1];
  root.hidden = false;
  root.innerHTML = `<div class="modal-overlay">${top.html()}</div>`;
  if (top.wire) top.wire(root);
}

function pushModal(entry) {
  modalStack.push(entry);
  renderModal();
}

function popModal() {
  modalStack.pop();
  renderModal();
}

function closeAllModals() {
  modalStack.length = 0;
  renderModal();
}

/* ---------- 8. Pages ---------------------------------------------------- */
function renderHome() {
  const c = STRINGS.home;
  const value = (iconName, t, b) =>
    `<article class="value-card"><span class="value-icon">${icon(iconName, 20)}</span><h3 class="value-title">${esc(t)}</h3><p class="value-body">${esc(b)}</p></article>`;
  return `
    <div class="route">
      <section class="hero">
        <span class="hero-eyebrow">${esc(c.heroEyebrow)}</span>
        <h1 class="hero-title">${esc(c.heroTitle)}</h1>
        <p class="hero-tagline">${esc(c.heroTagline)}</p>
        <p class="hero-lead">${esc(c.heroLead)}</p>
        <div class="cta-row">
          <a class="cta-primary" href="#/despensa">${esc(c.ctaPrimary)}</a>
          <a class="cta-secondary" href="#/receitas">${esc(c.ctaSecondary)}</a>
        </div>
      </section>
      <section class="section">
        <h2 class="section-title">${esc(c.videoSectionTitle)}</h2>
        <p class="section-lead">${esc(c.videoSectionLead)}</p>
        <div class="video-card">
          <a class="video-button" href="${esc(PITCH_VIDEO_URL)}" target="_blank" rel="noopener noreferrer">${icon('play-circle', 20)}${esc(c.videoButton)}</a>
          <p class="video-note">${esc(c.videoNote)}</p>
        </div>
      </section>
      <section class="section">
        <h2 class="section-title">${esc(c.valuesTitle)}</h2>
        <div class="cards-grid">
          ${value('bell', c.valueOne.title, c.valueOne.body)}
          ${value('chef-hat', c.valueTwo.title, c.valueTwo.body)}
          ${value('leaf', c.valueThree.title, c.valueThree.body)}
        </div>
      </section>
    </div>`;
}

function renderSobre() {
  const c = STRINGS.about;
  const phase = (p) =>
    `<article class="phase-card"><h3 class="phase-title">${esc(p.title)}</h3><p class="phase-body">${esc(p.body)}</p></article>`;
  return `
    <div class="route">
      <section class="hero">
        <span class="hero-eyebrow">${esc(c.heroEyebrow)}</span>
        <h1 class="hero-title">${esc(c.heroTitle)}</h1>
        <p class="hero-lead">${esc(c.heroLead)}</p>
      </section>
      <section class="section">
        <h2 class="section-title">${esc(c.contextTitle)}</h2>
        <p class="section-lead">${esc(c.contextBody)}</p>
      </section>
      <section class="section">
        <h2 class="section-title">${esc(c.sdgTitle)}</h2>
        <p class="section-lead">${esc(c.sdgBody)}</p>
      </section>
      <section class="section">
        <h2 class="section-title">${esc(c.teamTitle)}</h2>
        <p class="section-lead">${esc(c.teamLead)}</p>
        <ul class="team-list">${c.teamMembers.map((n) => `<li class="team-member">${esc(n)}</li>`).join('')}</ul>
      </section>
      <section class="section">
        <h2 class="section-title">${esc(c.phaseTitle)}</h2>
        <div class="phase-list">${phase(c.phaseOne)}${phase(c.phaseTwo)}${phase(c.phaseThree)}</div>
      </section>
    </div>`;
}

// --- Despensa ---
function pickGreeting(now) {
  const h = now.getHours();
  if (h < 12) return STRINGS.pantry.greetingMorning;
  if (h < 18) return STRINGS.pantry.greetingAfternoon;
  return STRINGS.pantry.greetingEvening;
}

function daysToExpiryCopy(expiresAt, now) {
  const days = differenceInCalendarDays(expiresAt, now);
  if (days < 0)
    return days === -1
      ? STRINGS.pantry.daysExpiredOne
      : interpolate(STRINGS.pantry.daysExpiredMany, { n: Math.abs(days) });
  if (days === 0) return STRINGS.pantry.daysToday;
  if (days === 1) return STRINGS.pantry.daysTomorrow;
  return interpolate(STRINGS.pantry.daysFuture, { n: days });
}

function ripenessBadgeHtml(ripeness) {
  return `<span class="badge ${ripeness}"><span class="badge-dot"></span>${esc(RIPENESS_LABELS[ripeness])}</span>`;
}

function pantryItemCardHtml(item, now) {
  const expiresAt = new Date(item.expiresAt);
  const storedAt = new Date(item.storedAt);
  const ripeness = computeRipeness(expiresAt, now);
  const urgent = ripeness === 'critical' || ripeness === 'aging';
  return `
    <li>
      <article class="item-card${urgent ? ' is-urgent' : ''}">
        <div class="item-clickable" role="button" tabindex="0" data-select-item="${esc(item.name)}" aria-label="Ver receitas com ${esc(item.name)}">
          <h2 class="item-title">${esc(item.name)}</h2>
          <span class="chip">${esc(FOOD_LABELS[item.category] || item.category)}</span>
          ${ripenessBadgeHtml(ripeness)}
          <div class="item-meta">
            <div class="expiry-row">${esc(daysToExpiryCopy(expiresAt, now))}</div>
            <div class="stored-row">${esc(STRINGS.pantry.storedAtPrefix)} ${formatDateBR(storedAt)}</div>
          </div>
          <span class="view-recipes-hint">${esc(STRINGS.pantry.viewRecipesHint)}${icon('chevron-right', 14)}</span>
        </div>
        <button type="button" class="remove-button" data-remove-item="${esc(item.id)}" aria-label="Remover ${esc(item.name)} da despensa">${icon('x', 16)}</button>
      </article>
    </li>`;
}

let pantrySearch = '';

function renderPantry() {
  const now = new Date();
  const items = readPantry();
  const query = pantrySearch.trim().toLowerCase();
  const filtered = query ? items.filter((i) => i.name.toLowerCase().includes(query)) : items;
  const sorted = [...filtered].sort(
    (a, b) =>
      differenceInCalendarDays(new Date(a.expiresAt), now) -
      differenceInCalendarDays(new Date(b.expiresAt), now),
  );
  const countLabel =
    items.length === 1
      ? interpolate(STRINGS.pantry.countSingular, { n: items.length })
      : interpolate(STRINGS.pantry.countPlural, { n: items.length });

  let body;
  if (items.length === 0) {
    body = `
      <div class="empty">
        <h2 class="empty-title">${esc(STRINGS.pantry.emptyTitle)}</h2>
        <p class="empty-body">${esc(STRINGS.pantry.emptyBody)}</p>
        <button type="button" class="add-button" data-open-add>${icon('plus')}${esc(STRINGS.pantry.emptyCta)}</button>
      </div>`;
  } else {
    body = `
      <span class="sort-label">${esc(STRINGS.pantry.sortLabel)}</span>
      <ul class="item-list">${sorted.map((item) => pantryItemCardHtml(item, now)).join('')}</ul>`;
  }

  return `
    <div class="page">
      <header class="page-header">
        <h1 class="page-title">${esc(pickGreeting(now))}</h1>
        <span class="page-count">${esc(countLabel)}</span>
      </header>
      <div class="toolbar">
        <div class="search-wrapper">
          <span class="search-icon">${icon('search')}</span>
          <input type="search" class="search-input" id="pantry-search" placeholder="${esc(STRINGS.pantry.searchPlaceholder)}" value="${esc(pantrySearch)}" aria-label="${esc(STRINGS.pantry.searchPlaceholder)}" />
        </div>
        <button type="button" class="add-button" data-open-add>${icon('plus')}${esc(STRINGS.pantry.addItemLabel)}</button>
      </div>
      ${body}
    </div>`;
}

function wirePantry(view) {
  const search = $('#pantry-search', view);
  if (search) {
    search.addEventListener('input', (e) => {
      pantrySearch = e.target.value;
      // Re-render the page, then restore focus + caret on the search box.
      const caret = e.target.selectionStart;
      view.innerHTML = renderPantry();
      wirePantry(view);
      const next = $('#pantry-search', view);
      next.focus();
      next.setSelectionRange(caret, caret);
    });
  }
  view.querySelectorAll('[data-open-add]').forEach((btn) =>
    btn.addEventListener('click', openAddItemModal),
  );
  view.querySelectorAll('[data-remove-item]').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      removePantryItem(btn.getAttribute('data-remove-item'));
      view.innerHTML = renderPantry();
      wirePantry(view);
    }),
  );
  const openItem = (name) => openItemRecipesModal(name);
  view.querySelectorAll('[data-select-item]').forEach((el) => {
    const name = el.getAttribute('data-select-item');
    el.addEventListener('click', () => openItem(name));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openItem(name);
      }
    });
  });
}

function openAddItemModal() {
  const defaultExpiry = (() => {
    const d = addDays(new Date(), 7);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();
  const p = STRINGS.pantry;
  const options = FOOD_OPTIONS.map(
    (cat) => `<option value="${cat}"${cat === 'vegetable' ? ' selected' : ''}>${esc(FOOD_LABELS[cat])}</option>`,
  ).join('');

  pushModal({
    html: () => `
      <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(p.modalTitle)}">
        <div class="modal-inner">
          <div class="modal-header">
            <h2 class="modal-title">${esc(p.modalTitle)}</h2>
            <button type="button" class="close-button" data-close aria-label="${esc(p.cancel)}">${icon('x')}</button>
          </div>
          <form class="modal-form" id="add-item-form">
            <div class="field">
              <label class="field-label" for="add-name">${esc(p.fieldName)}</label>
              <input class="field-input" id="add-name" name="name" type="text" required minlength="1" maxlength="80" placeholder="${esc(p.fieldNamePlaceholder)}" />
            </div>
            <div class="field">
              <label class="field-label" for="add-category">${esc(p.fieldCategory)}</label>
              <select class="field-select" id="add-category" name="category" required>${options}</select>
            </div>
            <div class="field">
              <label class="field-label" for="add-expires">${esc(p.fieldExpires)}</label>
              <input class="field-input" id="add-expires" name="expiresAt" type="date" required value="${defaultExpiry}" />
            </div>
            <div class="field">
              <label class="field-label" for="add-shelf">${esc(p.fieldShelf)}</label>
              <input class="field-input" id="add-shelf" name="shelfLifeDays" type="number" required min="1" value="7" />
              <span class="form-helper">${esc(p.fieldShelfHelper)}</span>
            </div>
            <div class="form-actions">
              <button type="button" class="form-cancel" data-close>${esc(p.cancel)}</button>
              <button type="submit" class="form-submit">${esc(p.submit)}</button>
            </div>
          </form>
        </div>
      </div>`,
    wire: (root) => {
      const form = $('#add-item-form', root);
      // pt-BR validation messages (browser defaults render in the OS language).
      const name = $('#add-name', root);
      const expires = $('#add-expires', root);
      const shelf = $('#add-shelf', root);
      name.addEventListener('invalid', () => name.setCustomValidity(p.validationName));
      name.addEventListener('input', () => name.setCustomValidity(''));
      expires.addEventListener('invalid', () => expires.setCustomValidity(p.validationExpires));
      expires.addEventListener('input', () => expires.setCustomValidity(''));
      shelf.addEventListener('invalid', () => shelf.setCustomValidity(p.validationShelf));
      shelf.addEventListener('input', () => shelf.setCustomValidity(''));

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const item = {
          id: uuid(),
          name: String(data.get('name')).trim(),
          category: String(data.get('category')),
          storedAt: new Date().toISOString(),
          expiresAt: new Date(`${String(data.get('expiresAt'))}T00:00:00Z`).toISOString(),
          shelfLifeDays: Number(data.get('shelfLifeDays')),
        };
        addPantryItem(item);
        closeAllModals();
        const view = $('#view');
        view.innerHTML = renderPantry();
        wirePantry(view);
      });
    },
  });
}

// --- Receitas ---
function recipeCardHtml(match) {
  const { recipe, matchedIngredients } = match;
  const r = STRINGS.recipes;
  const servings =
    recipe.servings === 1 ? r.servingsOne : interpolate(r.servings, { n: recipe.servings });
  const matchedBlock = matchedIngredients.length
    ? `<div class="matched"><span class="matched-label">${esc(r.matchedPrefix)}</span><div class="matched-tags">${matchedIngredients
        .map((n) => `<span class="matched-tag">${esc(n)}</span>`)
        .join('')}</div></div>`
    : '';
  const urgentBlock = match.urgent
    ? `<span class="urgent-chip">${icon('alert-triangle', 14)}${esc(r.urgentCritical)}</span>`
    : '';
  return `
    <li>
      <article class="recipe-card">
        <h2 class="recipe-title">${esc(recipe.title)}</h2>
        <span class="chip">${esc(CUISINE_LABELS[recipe.category])}</span>
        ${urgentBlock}
        <p class="recipe-description">${esc(recipe.description)}</p>
        ${matchedBlock}
        <div class="recipe-meta">
          <span class="meta-item">${icon('clock', 14)}${esc(interpolate(r.prepTime, { n: recipe.prepTimeMinutes }))}</span>
          <span class="meta-item">${icon('chef-hat', 14)}${esc(interpolate(r.cookTime, { n: recipe.cookTimeMinutes }))}</span>
          <span class="meta-item">${icon('users', 14)}${esc(servings)}</span>
        </div>
        <button type="button" class="view-button" data-view-recipe="${esc(recipe.id)}">${esc(r.viewRecipe)}</button>
      </article>
    </li>`;
}

function computeSuggestions(now) {
  const items = readPantry();
  const pantryInputs = items.map((item) => ({
    name: item.name,
    ripenessScore: RIPENESS_URGENCY[computeRipeness(new Date(item.expiresAt), now)],
  }));
  const urgentNames = items
    .filter((item) => {
      const rip = computeRipeness(new Date(item.expiresAt), now);
      return rip === 'critical' || rip === 'aging';
    })
    .map((item) => item.name.toLowerCase());
  const suggestions = rankRecipes(pantryInputs);
  // Mark a suggestion urgent when a matched ingredient is critical/aging.
  for (const match of suggestions) {
    match.urgent = match.matchedIngredients.some((ing) =>
      urgentNames.some((u) => u.includes(ing.toLowerCase()) || ing.toLowerCase().includes(u)),
    );
  }
  return suggestions;
}

function renderRecipes() {
  const now = new Date();
  const r = STRINGS.recipes;
  const suggestions = computeSuggestions(now);

  if (suggestions.length === 0) {
    return `
      <div class="page">
        <header class="page-header">
          <h1 class="page-title">${esc(r.title)}</h1>
          <p class="page-lead">${esc(r.leadEmpty)}</p>
        </header>
        <div class="empty">
          <h2 class="empty-title brand">${esc(r.emptyTitle)}</h2>
          <p class="empty-body">${esc(r.emptyBody)}</p>
        </div>
      </div>`;
  }

  const countLabel =
    suggestions.length === 1
      ? r.suggestionCountOne
      : interpolate(r.suggestionCount, { n: suggestions.length });

  return `
    <div class="page">
      <header class="page-header">
        <h1 class="page-title">${esc(r.title)}</h1>
        <p class="page-lead">${esc(r.leadWithItems)}</p>
        <span class="page-count">${esc(countLabel)}</span>
      </header>
      <ul class="recipe-grid">${suggestions.map(recipeCardHtml).join('')}</ul>
    </div>`;
}

function wireRecipes(view) {
  view.querySelectorAll('[data-view-recipe]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const recipe = RECIPES.find((rec) => rec.id === btn.getAttribute('data-view-recipe'));
      if (recipe) openRecipeDetailModal(recipe);
    }),
  );
}

function recipeDetailModalEntry(recipe) {
  const r = STRINGS.recipes;
  return {
    html: () => `
      <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(recipe.title)}">
        <div class="modal-inner">
          <div class="modal-header">
            <h2 class="modal-title">${esc(recipe.title)}</h2>
            <button type="button" class="close-button" data-close aria-label="Fechar">${icon('x')}</button>
          </div>
          <p class="recipe-description">${esc(recipe.description)}</p>
          <div>
            <h3 class="section-label">${esc(r.ingredientsTitle)}</h3>
            <ul class="ingredient-list">${recipe.ingredients
              .map((ing) => `<li>${esc(ing.amount)} de ${esc(ing.name)}${ing.optional ? ' (opcional)' : ''}</li>`)
              .join('')}</ul>
          </div>
          <div>
            <h3 class="section-label">${esc(r.stepsTitle)}</h3>
            <ol class="step-list">${recipe.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
          </div>
        </div>
      </div>`,
  };
}

function openRecipeDetailModal(recipe) {
  pushModal(recipeDetailModalEntry(recipe));
}

function openItemRecipesModal(ingredientName) {
  const r = STRINGS.recipes;
  const recipes = recipesForIngredient(ingredientName);
  pushModal({
    html: () => {
      let inner;
      if (recipes.length === 0) {
        inner = `<div class="empty"><h3 class="empty-title">${esc(r.itemModalEmptyTitle)}</h3><p class="empty-body">${esc(r.itemModalEmptyBody)}</p></div>`;
      } else {
        const countLabel =
          recipes.length === 1
            ? r.itemModalCountOne
            : interpolate(r.itemModalCount, { n: recipes.length });
        inner = `
          <p class="recipe-description">${esc(r.itemModalLead)}</p>
          <span class="page-count">${esc(countLabel)}</span>
          <ul class="item-recipe-list">${recipes
            .map(
              (rec) => `
            <li>
              <button type="button" class="item-recipe-row" data-open-detail="${esc(rec.id)}">
                <span class="item-recipe-name">${esc(rec.title)}</span>
                <span class="item-recipe-meta">${icon('clock', 14)}${rec.prepTimeMinutes + rec.cookTimeMinutes} min ${icon('chef-hat', 14)}${esc(CUISINE_LABELS[rec.category])}</span>
              </button>
            </li>`,
            )
            .join('')}</ul>`;
      }
      return `
        <div class="modal" role="dialog" aria-modal="true" aria-label="${esc(interpolate(r.itemModalTitle, { item: ingredientName }))}">
          <div class="modal-inner">
            <div class="modal-header">
              <h2 class="modal-title">${esc(interpolate(r.itemModalTitle, { item: ingredientName }))}</h2>
              <button type="button" class="close-button" data-close aria-label="Fechar">${icon('x')}</button>
            </div>
            ${inner}
          </div>
        </div>`;
    },
    wire: (root) => {
      root.querySelectorAll('[data-open-detail]').forEach((btn) =>
        btn.addEventListener('click', () => {
          const recipe = RECIPES.find((rec) => rec.id === btn.getAttribute('data-open-detail'));
          if (recipe) pushModal(recipeDetailModalEntry(recipe)); // stacks on top
        }),
      );
    },
  });
}

// --- Fale Conosco ---
let contactSucceeded = false;

function renderContato() {
  const c = STRINGS.contact;
  if (contactSucceeded) {
    return `
      <div class="page contact-page">
        <div class="success">
          <span class="success-icon">${icon('check-circle', 48)}</span>
          <h2 class="success-title">${esc(c.successTitle)}</h2>
          <p class="success-body">${esc(c.successBody)}</p>
          <button type="button" class="success-again" data-contact-again>${esc(c.successAgain)}</button>
        </div>
      </div>`;
  }
  const options = CONTACT_SUBJECTS.map(
    (s) => `<option value="${s}"${s === 'suggestion' ? ' selected' : ''}>${esc(c.subjects[s])}</option>`,
  ).join('');
  return `
    <div class="page contact-page">
      <header class="page-header">
        <h1 class="page-title">${esc(c.title)}</h1>
        <p class="page-lead">${esc(c.lead)}</p>
      </header>
      <form class="contact-form" id="contact-form">
        <div class="field">
          <label class="field-label" for="contact-name">${esc(c.name)}</label>
          <input class="field-input" id="contact-name" name="name" type="text" required minlength="2" maxlength="80" placeholder="${esc(c.namePlaceholder)}" />
        </div>
        <div class="field">
          <label class="field-label" for="contact-email">${esc(c.email)}</label>
          <input class="field-input" id="contact-email" name="email" type="email" required placeholder="${esc(c.emailPlaceholder)}" />
        </div>
        <div class="field">
          <label class="field-label" for="contact-subject">${esc(c.subject)}</label>
          <select class="field-select" id="contact-subject" name="subject" required>${options}</select>
        </div>
        <div class="field">
          <label class="field-label" for="contact-message">${esc(c.message)}</label>
          <textarea class="field-textarea" id="contact-message" name="message" required minlength="10" maxlength="1000" placeholder="${esc(c.messagePlaceholder)}"></textarea>
        </div>
        <button type="submit" class="submit-button">${icon('send')}${esc(c.submit)}</button>
      </form>
    </div>`;
}

function wireContato(view) {
  const c = STRINGS.contact;
  const again = view.querySelector('[data-contact-again]');
  if (again) {
    again.addEventListener('click', () => {
      contactSucceeded = false;
      view.innerHTML = renderContato();
      wireContato(view);
    });
    return;
  }
  const form = $('#contact-form', view);
  if (!form) return;
  const name = $('#contact-name', view);
  const email = $('#contact-email', view);
  const message = $('#contact-message', view);
  name.addEventListener('invalid', () => name.setCustomValidity(c.vName));
  name.addEventListener('input', () => name.setCustomValidity(''));
  email.addEventListener('invalid', () => email.setCustomValidity(c.vEmail));
  email.addEventListener('input', () => email.setCustomValidity(''));
  message.addEventListener('invalid', () => message.setCustomValidity(c.vMessage));
  message.addEventListener('input', () => message.setCustomValidity(''));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // No backend in the FIAP build — acknowledge success locally.
    contactSucceeded = true;
    view.innerHTML = renderContato();
    wireContato(view);
  });
}

/* ---------- 9. Router --------------------------------------------------- */
const ROUTES = [
  { path: '/', label: STRINGS.nav.home, iconName: 'home', render: renderHome, wire: null },
  { path: '/despensa', label: STRINGS.nav.pantry, iconName: 'refrigerator', render: renderPantry, wire: wirePantry },
  { path: '/receitas', label: STRINGS.nav.recipes, iconName: 'chef-hat', render: renderRecipes, wire: wireRecipes },
  { path: '/contato', label: STRINGS.nav.contact, iconName: 'mail', render: renderContato, wire: wireContato },
  { path: '/sobre', label: STRINGS.nav.about, iconName: 'info', render: renderSobre, wire: null },
];

function currentPath() {
  const hash = location.hash.replace(/^#/, '');
  return hash || '/';
}

function handleRoute() {
  const path = currentPath();
  const route = ROUTES.find((r) => r.path === path) || ROUTES[0];

  // A fresh visit to Fale Conosco always starts on the form.
  if (route.path !== '/contato') contactSucceeded = false;

  closeAllModals();
  const view = $('#view');
  view.innerHTML = route.render();
  if (route.wire) route.wire(view);

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('data-path') === route.path);
  });
  window.scrollTo(0, 0);
}

/* ---------- 10. Bootstrap ----------------------------------------------- */
function renderChrome() {
  const navLinks = ROUTES.map(
    (r) =>
      `<li><a class="nav-link" href="#${r.path}" data-path="${r.path}">${icon(r.iconName, 18)}<span class="nav-label">${esc(r.label)}</span></a></li>`,
  ).join('');

  document.getElementById('root').innerHTML = `
    <div class="layout">
      <header class="header">
        <span class="brand-mark">${esc(STRINGS.brand.name)}</span>
        <nav class="nav" aria-label="Navegação principal"><ul class="nav-list">${navLinks}</ul></nav>
        <div class="header-end" id="theme-slot">${themeToggleHtml()}</div>
      </header>
      <main class="main" id="view"></main>
      <footer class="footer"><small>${esc(STRINGS.footer.legend)}</small></footer>
    </div>
    <div class="modal-root" id="modal-root" hidden></div>`;
}

function wireGlobalEvents() {
  // Theme toggle (delegated — survives re-renders of the slot).
  document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('[data-theme-mode]');
    if (themeBtn) setThemeMode(themeBtn.getAttribute('data-theme-mode'));
  });

  // Modal: close on backdrop click or any [data-close]; ESC closes the top.
  const modalRoot = $('#modal-root');
  modalRoot.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') || e.target.closest('[data-close]')) {
      popModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalStack.length) popModal();
  });

  window.addEventListener('hashchange', handleRoute);
}

function init() {
  applyTheme(readThemeMode());
  renderChrome();
  wireGlobalEvents();
  handleRoute();
}

init();
