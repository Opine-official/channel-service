import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IDeleteCategoryFromChannelDTO {
  categoryId: string;
  channelId: string;
}

interface IDeleteCategoryFromChannelResult {
  categoryId: string;
  channelId: string;
}

export class DeleteCategoryFromChannel
  implements
    IUseCase<IDeleteCategoryFromChannelDTO, IDeleteCategoryFromChannelResult>
{
  constructor(
    private readonly _categoryRepo: ICategoryRepository,
    private readonly _channelRepo: IChannelRepository,
  ) {}

  async execute(
    input: IDeleteCategoryFromChannelDTO,
  ): Promise<IDeleteCategoryFromChannelResult | Error> {
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
