import { Channel } from '../../domain/entities/Channel';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetChannelsDTO {
  page: number; //to implement pagination later.
}

interface IGetChannelsResult {
  channels: Channel[];
}

export class GetChannels
  implements IUseCase<IGetChannelsDTO, IGetChannelsResult>
{
  constructor(private readonly _channelRepo: IChannelRepository) {}

  async execute(): Promise<IGetChannelsResult | Error> {
    const channels = await this._channelRepo.getChannels();

    if (channels instanceof Error) {
      return channels;
    }

    return { channels: channels };
  }
}
