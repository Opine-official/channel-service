import { ChannelSubscribe } from '../../domain/entities/ChannelSubscribe';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IChannelSubscribeRepository } from '../../domain/interfaces/IChannelSubscribeRepository';
import { IMessageProducer } from '../../domain/interfaces/IMessageProducer';
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
    private readonly _channelSubRepo: IChannelSubscribeRepository,
    private readonly _channelRepo: IChannelRepository,
    private readonly _messageProducer: IMessageProducer,
  ) {}

  public async execute({
    userId,
    channelId,
    channelName,
  }: ISaveChannelSubscribeDTO): Promise<ISaveChannelSubscribeResult | Error> {
    const channelSubscribe = new ChannelSubscribe({
      userId,
      channelId,
      channelName,
    });

    const result = await this._channelSubRepo.save(channelSubscribe);

    if (result instanceof Error) {
      return result;
    }

    const updateSubscriberCountResult =
      await this._channelRepo.incrementSubscriberCount(channelId);

    if (updateSubscriberCountResult instanceof Error) {
      return updateSubscriberCountResult;
    }

    const kafkaResult = await this._messageProducer.sendToTopic(
      'channel-subscribe-topic',
      'channel-subscribe-topic-1',
      JSON.stringify(channelSubscribe),
    );

    if (kafkaResult instanceof Error) {
      return kafkaResult;
    }

    return {
      channelSubscribe,
    };
  }
}
