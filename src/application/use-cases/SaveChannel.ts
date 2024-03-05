import { Channel } from '../../domain/entities/Channel';
import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface ISaveChannelDTO {
  name: string;
  description: string;
  categories: string[];
}

interface ISaveChannelResult {
  channelId: string;
}

export class SaveChannel
  implements IUseCase<ISaveChannelDTO, ISaveChannelResult>
{
  constructor(
    private readonly _channelRepo: IChannelRepository,
    private readonly _categoryRepo: ICategoryRepository,
  ) {}

  async execute(input: ISaveChannelDTO): Promise<ISaveChannelResult | Error> {
    const categoryIds = await this._categoryRepo.getCategoryIds(
      input.categories,
    );

    if (categoryIds instanceof Error) {
      return categoryIds;
    }

    const channel = new Channel({
      name: input.name,
      description: input.description,
      categories: categoryIds,
    });

    const saveChannelResult = await this._channelRepo.save(channel);

    if (saveChannelResult instanceof Error) {
      return saveChannelResult;
    }

    const addChannelToCategories = await Promise.all(
      channel.categories.map((category_id) =>
        this._categoryRepo.addChannelToCategory(category_id, saveChannelResult),
      ),
    );

    const error = addChannelToCategories.find(
      (result) => result instanceof Error,
    );

    if (error) {
      return error;
    }

    return {
      channelId: channel.channelId,
    };
  }
}
