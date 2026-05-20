import { CuisineCategory } from './domain/enums';

export const strings = {
  page: {
    title: 'Receitas para aproveitar',
    leadWithItems:
      'A gente priorizou as receitas que usam os alimentos mais perto do vencimento. Cozinha primeiro o que pede mais atenção!',
    leadEmpty: 'Aqui ficam as receitas que aproveitam o que está na sua despensa.',
    emptyTitle: 'Tudo fresquinho por aqui!',
    emptyBody:
      'Quando um ingrediente estiver chegando no vencimento, você vê aqui as receitas pra aproveitá-lo antes que vire desperdício.',
    suggestionCount: '{n} receitas sugeridas pra você',
    suggestionCountOne: '1 receita sugerida pra você',
  },
  card: {
    matchedPrefix: 'Usa o que você tem:',
    prepTime: '{n} min de preparo',
    cookTime: '{n} min de cozimento',
    servings: '{n} porções',
    servingsOne: '1 porção',
    urgentCritical: 'Aproveite logo!',
    urgentAging: 'Vence em breve',
    viewRecipe: 'Ver receita',
    ingredientsTitle: 'Ingredientes',
    stepsTitle: 'Modo de preparo',
    close: 'Fechar',
  },
  itemModal: {
    title: 'Receitas com {item}',
    lead: 'Que tal aproveitar esse ingrediente em uma dessas receitas?',
    countOne: '1 receita encontrada',
    count: '{n} receitas encontradas',
    emptyTitle: 'Nenhuma receita com esse ingrediente, por enquanto.',
    emptyBody:
      'A gente ainda não tem uma receita que usa esse item — mas você pode explorar todas na aba Receitas.',
    close: 'Fechar',
    viewRecipe: 'Ver modo de preparo',
  },
  categoryLabels: {
    [CuisineCategory.MainDish]: 'Prato principal',
    [CuisineCategory.SaladSide]: 'Salada e acompanhamento',
    [CuisineCategory.Soup]: 'Sopa',
    [CuisineCategory.Breakfast]: 'Café da manhã',
    [CuisineCategory.Snack]: 'Lanche',
    [CuisineCategory.Dessert]: 'Sobremesa',
  } as const,
} as const;
