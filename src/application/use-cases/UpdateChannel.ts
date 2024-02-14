import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IUpdateChannelDTO {
  channelId: string;
  name: string;
  description: string;
  categories: string[];
}

interface IUpdateChannelResult {
  channelId: string;
}

export class UpdateChannel
  implements IUseCase<IUpdateChannelDTO, IUpdateChannelResult>
{
  constructor(
    private readonly _categoryRepo: ICategoryRepository,
    private readonly _channelRepo: IChannelRepository,
  ) {}

  async execute(
    input: IUpdateChannelDTO,
  ): Promise<IUpdateChannelResult | Error> {
    const categoryIds = await this._categoryRepo.getCategoryIds(
      input.categories,
    );

    if (categoryIds instanceof Error) {
      return categoryIds;
    }

    const updateChannelResult = await this._channelRepo.update({
      channelId: input.channelId,
      name: input.name,
      description: input.description,
      categories: categoryIds,
      subscriberCount: 0, // not used
    });

    if (updateChannelResult instanceof Error) {
      return updateChannelResult;
    }

    return {
      channelId: input.channelId,
    };
  }
}
