import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IChannelSubscribeRepository } from '../../domain/interfaces/IChannelSubscribeRepository';
import { IMessageProducer } from '../../domain/interfaces/IMessageProducer';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IDeleteChannelSubscribeDTO {
  userId: string;
  channelId: string;
}

interface IDeleteChannelSubscribeResult {
  message: string;
}

export class DeleteChannelSubscribe
  implements
    IUseCase<IDeleteChannelSubscribeDTO, IDeleteChannelSubscribeResult>
{
  constructor(
    private readonly _channelSubRepo: IChannelSubscribeRepository,
    private readonly _channelRepo: IChannelRepository,
    private readonly _messageProducer: IMessageProducer,
  ) {}

  public async execute({
    userId,
    channelId,
  }: IDeleteChannelSubscribeDTO): Promise<
    IDeleteChannelSubscribeResult | Error
  > {
    const channelSubscribeId = await this._channelSubRepo.getChannelSubscribeId(
      userId,
      channelId,
    );

    if (channelSubscribeId instanceof Error) {
      return channelSubscribeId;
    }

    const result = await this._channelSubRepo.delete(channelSubscribeId);

    if (result instanceof Error) {
      return result;
    }

    const decrementSubscriberCount =
      await this._channelRepo.decrementSubscriberCount(channelId);

    if (decrementSubscriberCount instanceof Error) {
      return decrementSubscriberCount;
    }

    const kafkaResult = await this._messageProducer.sendToTopic(
      'channel-subscribe-delete-topic',
      'channel-subscribe-delete-topic-1',
      JSON.stringify(channelSubscribeId),
    );

    if (kafkaResult instanceof Error) {
      return kafkaResult;
    }

    return {
      message: 'Channel unsubscribed successfully',
    };
  }
}
