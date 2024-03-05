import { ChannelSubscribe } from '../entities/ChannelSubscribe';

export interface IChannelSubscribeRepository {
  get(channelSubscribeId: string): Promise<Error | ChannelSubscribe>;
  save(channelSubscribe: ChannelSubscribe): Promise<void | Error>;
  update(channelSubscribe: ChannelSubscribe): Promise<void | Error>;
  delete(channelSubscribeId: string): Promise<void | Error>;
  isSubscribed(
    userId: string | null,
    channelId: string,
  ): Promise<Error | boolean>;
  getChannelSubscribeId(
    userId: string,
    channelId: string,
  ): Promise<Error | string>;
}
