import {
  ChannelInfo,
  ICategoryRepository,
} from '../../domain/interfaces/ICategoryRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetChannelsByCategoryDTO {
  categoryId: string;
}

interface IGetChannelsResult {
  channels: ChannelInfo[];
}

export class GetChannelsByCategory
  implements IUseCase<IGetChannelsByCategoryDTO, IGetChannelsResult>
{
  constructor(private readonly _categoryRepo: ICategoryRepository) {}

  async execute(
    input: IGetChannelsByCategoryDTO,
  ): Promise<IGetChannelsResult | Error> {
    const channels = await this._categoryRepo.getChannelsByCategory(
      input.categoryId,
    );

    if (channels instanceof Error) {
      return channels;
    }

    return {
      channels: channels,
    };
  }
}
