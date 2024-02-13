import { Channel } from '../../domain/entities/Channel';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetChannelDTO {
  channelName: string;
}

interface IGetChannelResult {
  channel: Channel;
}

export class GetChannel implements IUseCase<IGetChannelDTO, IGetChannelResult> {
  constructor(private readonly _channelRepo: IChannelRepository) {}

  async execute(input: IGetChannelDTO): Promise<IGetChannelResult | Error> {
    const channelId = await this._channelRepo.getChannelIdFromName(
      input.channelName,
    );

    if (channelId instanceof Error) {
      return new Error('ChannelId not found');
    }

    const channel = await this._channelRepo.get(channelId);
    if (channel instanceof Error) {
      return new Error('Channel not found');
    }

    return {
      channel: channel,
    };
  }
}
