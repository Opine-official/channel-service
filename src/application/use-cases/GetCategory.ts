import { Category } from '../../domain/entities/Category';
import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetCategoryDTO {
  categoryId: string;
}

interface IGetCategoryResult {
  category: Category;
}

export class GetCategory
  implements IUseCase<IGetCategoryDTO, IGetCategoryResult>
{
  constructor(private readonly _categoryRepo: ICategoryRepository) {}

  async execute(input: IGetCategoryDTO): Promise<IGetCategoryResult | Error> {
    const category = await this._categoryRepo.get(input.categoryId);

    if (category instanceof Error) {
      return new Error('Category not found');
    }

    return {
      category: category,
    };
  }
}
