import { Channel } from '../entities/Channel';

export interface IChannelRepository {
  save(channel: Channel): Promise<void | Error>;
  delete(channelId: string): Promise<void | Error>;
  // getChannels(): Promise<Error | Channel[]>;
  // getChannelById(channelId: string): Promise<Error | Channel>;
}
