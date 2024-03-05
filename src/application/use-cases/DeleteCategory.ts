import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IDeleteCategoryDTO {
  categoryId: string;
}

interface IDeleteCategoryResult {
  categoryId: string;
}

export class DeleteCategory
  implements IUseCase<IDeleteCategoryDTO, IDeleteCategoryResult>
{
  public constructor(private readonly _categoryRepo: ICategoryRepository) {}

  public async execute(
    input: IDeleteCategoryDTO,
  ): Promise<IDeleteCategoryResult | Error> {
    const deleteCategoryResult = await this._categoryRepo.delete(
      input.categoryId,
    );

    if (deleteCategoryResult instanceof Error) {
      return deleteCategoryResult;
    }

    return {
      categoryId: input.categoryId,
    };
  }
}
