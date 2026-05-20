/**
 * Shared user-facing copy in pt-BR.
 *
 * Per the brand doc §10, capabilities own their own strings.pt-BR.ts.
 * This file holds copy for the shared layout chrome (nav, theme
 * toggle, footer) and other primitives that don't belong to a single
 * capability.
 */

export const strings = {
  brand: {
    name: 'renutri',
    tagline: 'Sua despensa organizada. Sua comida aproveitada.',
  },
  nav: {
    home: 'Início',
    pantry: 'Despensa',
    recipes: 'Receitas',
    contact: 'Fale Conosco',
    about: 'Sobre',
    ariaLabel: 'Navegação principal',
    skipToContent: 'Ir para o conteúdo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },
  theme: {
    sectionLabel: 'Tema',
    system: 'Sistema',
    light: 'Claro',
    dark: 'Escuro',
  },
  footer: {
    legend: 'Feito com cuidado para reduzir o desperdício.',
  },
} as const;
