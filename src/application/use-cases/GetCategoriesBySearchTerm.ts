import { Category } from '../../domain/entities/Category';
import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetCategoriesBySearchTermDTO {
  searchTerm: string;
}

interface IGetCategoriesBySearchTermResult {
  categories: Category[];
}

export class GetCategoriesBySearchTerm
  implements
    IUseCase<IGetCategoriesBySearchTermDTO, IGetCategoriesBySearchTermResult>
{
  constructor(private readonly _categoryRepo: ICategoryRepository) {}

  async execute(
    input: IGetCategoriesBySearchTermDTO,
  ): Promise<IGetCategoriesBySearchTermResult | Error> {
    const categories = await this._categoryRepo.getCategoriesBySearchTerm(
      input.searchTerm,
    );

    if (categories instanceof Error) {
      return categories;
    }

    return {
      categories,
    };
  }
}
