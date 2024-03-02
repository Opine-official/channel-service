import { Channel } from '../../domain/entities/Channel';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetTopChannelDTO {}

interface IGetTopChannelResult {
  channels: Channel[];
}

export class GetTopChannels
  implements IUseCase<IGetTopChannelDTO, IGetTopChannelResult>
{
  constructor(private readonly _channelRepo: IChannelRepository) {}

  async execute(
    input: IGetTopChannelDTO,
  ): Promise<IGetTopChannelResult | Error> {
    console.log(input);
    const channels = await this._channelRepo.topChannels();
    if (channels instanceof Error) {
      return new Error('Error while getting top channels');
    }
    return {
      channels: channels,
    };
  }
}
