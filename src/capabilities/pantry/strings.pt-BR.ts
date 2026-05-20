/**
 * pt-BR copy for the pantry capability.
 *
 * Voice register: fully warm and conversational per brand doc Q7.
 * você throughout; informal greetings; supportive tone.
 */

import { FoodCategory } from './domain/enums';

export const strings = {
  page: {
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
  },
  card: {
    storedAtPrefix: 'Adicionado em',
    daysExpiredOne: 'Venceu ontem',
    daysExpiredMany: 'Venceu há {n} dias',
    daysToday: 'Vence hoje',
    daysTomorrow: 'Vence amanhã',
    daysFuture: 'Vence em {n} dias',
    removeAriaLabel: 'Remover {name} da despensa',
    selectAriaLabel: 'Ver receitas com {name}',
    viewRecipesHint: 'Ver receitas',
  },
  ripeness: {
    fresh: 'verdinho',
    peak: 'maduro',
    aging: 'atenção',
    critical: 'use já',
    spoiled: 'estragado',
  },
  modal: {
    title: 'Adicionar à despensa',
    fields: {
      name: 'Nome do alimento',
      namePlaceholder: 'Ex: Tomate italiano',
      category: 'Categoria',
      expiresAt: 'Vence em',
      shelfLifeDays: 'Validade total (em dias)',
      shelfLifeHelper:
        'Quantos dias o alimento dura na geladeira ou despensa, em média.',
    },
    submit: 'Salvar alimento',
    cancel: 'Cancelar',
    validationName: 'Coloca o nome do alimento, por favor.',
    validationExpiresAt: 'Escolhe uma data de validade.',
    validationShelfLife: 'A validade precisa ser pelo menos 1 dia.',
  },
  categoryLabels: {
    [FoodCategory.Vegetable]: 'Verdura',
    [FoodCategory.Fruit]: 'Fruta',
    [FoodCategory.Dairy]: 'Laticínio',
    [FoodCategory.Protein]: 'Proteína',
    [FoodCategory.Grain]: 'Grão',
    [FoodCategory.PantryStaple]: 'Despensa',
    [FoodCategory.Beverage]: 'Bebida',
    [FoodCategory.Other]: 'Outro',
  } as const,
} as const;
