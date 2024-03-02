import { Channel } from '../entities/Channel';

export type CategoryInfo = {
  categoryId: string;
  name: string;
};

export interface IChannelRepository {
  get(channelId: string): Promise<Channel | Error>;
  save(channel: Channel): Promise<string | Error>;
  update(channel: Channel): Promise<void | Error>;
  delete(channelId: string): Promise<void | Error>;
  incrementSubscriberCount(channelId: string): Promise<void | Error>;
  decrementSubscriberCount(channelId: string): Promise<void | Error>;
  getChannels(): Promise<Error | Channel[]>;
  getChannelIdFromName(channelName: string): Promise<string | Error>;
  getChannelIds(channelIds: string[]): Promise<string[] | Error>;
  getCategoriesByChannel(channelId: string): Promise<CategoryInfo[] | Error>;
  getChannelsBySearchTerm(searchTerm: string): Promise<Channel[] | Error>;
  addCategoryToChannel(
    channel_id: string,
    category_id: string,
  ): Promise<void | Error>;
  deleteCategoryFromChannel(
    channelId: string,
    categoryId: string,
  ): Promise<void | Error>;
  getMongoIdFromChannelId(channelId: string): Promise<string | Error>;
  topChannels(): Promise<Channel[] | Error>;
}
