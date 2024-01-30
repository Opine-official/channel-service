import { Category } from '../../domain/entities/Category';
import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetCategoriesDTO {
  page: number; //to implement pagination later.
}

interface IGetCategoriesResult {
  categories: Category[];
}

export class GetCategories
  implements IUseCase<IGetCategoriesDTO, IGetCategoriesResult>
{
  constructor(private readonly _categoryRepo: ICategoryRepository) {}

  async execute(): Promise<IGetCategoriesResult | Error> {
    const categories = await this._categoryRepo.getCategories();

    if (categories instanceof Error) {
      return categories;
    }

    return { categories: categories };
  }
}
