import {
  CategoryInfo,
  IChannelRepository,
} from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetCategoriesByChannelDTO {
  channelId: string;
}

interface IGetCategoriesByChannelResult {
  categories: CategoryInfo[];
}

export class GetCategoriesByChannel
  implements
    IUseCase<IGetCategoriesByChannelDTO, IGetCategoriesByChannelResult>
{
  constructor(private readonly _channelRepo: IChannelRepository) {}

  async execute(
    input: IGetCategoriesByChannelDTO,
  ): Promise<IGetCategoriesByChannelResult | Error> {
    const categories = await this._channelRepo.getCategoriesByChannel(
      input.channelId,
    );

    if (categories instanceof Error) {
      return categories;
    }

    return {
      categories: categories,
    };
  }
}
