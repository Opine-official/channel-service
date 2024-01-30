import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IDeleteChannelFromCategoryDTO {
  categoryId: string;
  channelId: string;
}

interface IDeleteChannelFromCategoryResult {
  categoryId: string;
  channelId: string;
}

export class DeleteChannelFromCategory
  implements
    IUseCase<IDeleteChannelFromCategoryDTO, IDeleteChannelFromCategoryResult>
{
  constructor(
    private readonly _categoryRepo: ICategoryRepository,
    private readonly _channelRepo: IChannelRepository,
  ) {}

  async execute(
    input: IDeleteChannelFromCategoryDTO,
  ): Promise<IDeleteChannelFromCategoryResult | Error> {
    const deleteChannelFromCategoryResult =
      await this._categoryRepo.deleteChannelFromCategory(
        input.categoryId,
        input.channelId,
      );

    if (deleteChannelFromCategoryResult instanceof Error) {
      return deleteChannelFromCategoryResult;
    }

    const deleteCategoryFromChannelResult =
      await this._channelRepo.deleteCategoryFromChannel(
        input.categoryId,
        input.channelId,
      );

    if (deleteCategoryFromChannelResult instanceof Error) {
      return deleteCategoryFromChannelResult;
    }

    return {
      categoryId: input.categoryId,
      channelId: input.channelId,
    };
  }
}
