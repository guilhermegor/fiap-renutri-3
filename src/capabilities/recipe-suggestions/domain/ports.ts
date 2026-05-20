import { RecipeDTO } from './dto';

export interface IRecipeRepository {
  findAll(): Promise<RecipeDTO[]>;
}

export interface INotifier {
  success(message: string): void;
  error(message: string): void;
  info(message: string): void;
}
