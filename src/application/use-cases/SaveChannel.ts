import { Channel } from '../../domain/entities/Channel';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface ISaveChannelDTO {
  name: string;
  description: string;
  categories: string[];
  similar: string[];
  followerCount: number;
}

interface ISaveChannelResult {
  channelId: string;
}

export class SaveChannel
  implements IUseCase<ISaveChannelDTO, ISaveChannelResult>
{
  constructor(private readonly _channelRepo: IChannelRepository) {}

  async execute(input: ISaveChannelDTO): Promise<ISaveChannelResult | Error> {
    const channel = new Channel({
      name: input.name,
      description: input.description,
      categories: input.categories,
      similar: input.similar,
      followerCount: input.followerCount,
    });
    const saveChannelResult = await this._channelRepo.save(channel);

    if (saveChannelResult instanceof Error) {
      return saveChannelResult;
    }

    return {
      channelId: channel.channelId,
    };
  }
}
