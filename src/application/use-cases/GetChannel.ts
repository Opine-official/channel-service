import { Channel } from '../../domain/entities/Channel';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IChannelSubscribeRepository } from '../../domain/interfaces/IChannelSubscribeRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetChannelDTO {
  channelName: string;
  userId: string | null;
}

interface IGetChannelResult {
  channel: Channel;
  isUserSubscribed: boolean;
}

export class GetChannel implements IUseCase<IGetChannelDTO, IGetChannelResult> {
  constructor(
    private readonly _channelRepo: IChannelRepository,
    private readonly _channelSubRepo: IChannelSubscribeRepository,
  ) {}

  async execute(input: IGetChannelDTO): Promise<IGetChannelResult | Error> {
    const channelId = await this._channelRepo.getChannelIdFromName(
      input.channelName,
    );

    const userId = input.userId ? input.userId : null;

    if (channelId instanceof Error) {
      return new Error('ChannelId not found');
    }

    const channel = await this._channelRepo.get(channelId);
    if (channel instanceof Error) {
      return new Error('Channel not found');
    }

    const isUserSubscribed = await this._channelSubRepo.isSubscribed(
      userId,
      channelId,
    );

    if (isUserSubscribed instanceof Error) {
      return {
        channel: channel,
        isUserSubscribed: false,
      };
    }

    return {
      channel: channel,
      isUserSubscribed: isUserSubscribed,
    };
  }
}
