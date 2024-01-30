import { Channel } from '../entities/Channel';

export interface IChannelRepository {
  save(channel: Channel): Promise<void | Error>;
  delete(channelId: string): Promise<void | Error>;
  getChannelIds(channelIds: string[]): Promise<string[] | Error>;
  getChannelsBySearchTerm(searchTerm: string): Promise<Channel[] | Error>;
  addCategoryToChannel(
    channelId: string,
    categoryId: string,
  ): Promise<void | Error>;
}
