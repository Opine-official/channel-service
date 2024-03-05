import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IUpdateCategoryDTO {
  categoryId: string;
  name: string;
  description: string;
  channels: string[];
}

interface IUpdateCategoryResult {
  categoryId: string;
}

export class UpdateCategory
  implements IUseCase<IUpdateCategoryDTO, IUpdateCategoryResult>
{
  constructor(
    private readonly _categoryRepo: ICategoryRepository,
    private readonly _channelRepo: IChannelRepository,
  ) {}

  async execute(
    input: IUpdateCategoryDTO,
  ): Promise<IUpdateCategoryResult | Error> {
    const channelIds = await this._channelRepo.getChannelIds(input.channels);

    if (channelIds instanceof Error) {
      return channelIds;
    }

    const updateCategoryResult = await this._categoryRepo.update({
      categoryId: input.categoryId,
      name: input.name,
      description: input.description,
      channels: channelIds,
    });

    if (updateCategoryResult instanceof Error) {
      return updateCategoryResult;
    }

    return {
      categoryId: input.categoryId,
    };
  }
}
