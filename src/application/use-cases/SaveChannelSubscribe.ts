import { ChannelSubscribe } from '../../domain/entities/ChannelSubscribe';
import { IChannelSubscribeRepository } from '../../domain/interfaces/IChannelSubscribeRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface ISaveChannelSubscribeDTO {
  userId: string;
  channelId: string;
  channelName: string;
}

interface ISaveChannelSubscribeResult {
  channelSubscribe: ChannelSubscribe;
}

export class SaveChannelSubscribe
  implements IUseCase<ISaveChannelSubscribeDTO, ISaveChannelSubscribeResult>
{
  constructor(
    private readonly channelSubscribeRepository: IChannelSubscribeRepository,
  ) {}

  public async execute({
    userId,
    channelId,
    channelName,
  }: ISaveChannelSubscribeDTO): Promise<ISaveChannelSubscribeResult> {
    const channelSubscribe = new ChannelSubscribe({
      userId,
      channelId,
      channelName,
    });

    await this.channelSubscribeRepository.save(channelSubscribe);

    return {
      channelSubscribe,
    };
  }
}
