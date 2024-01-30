import { Channel } from '../entities/Channel';

export type CategoryInfo = {
  categoryId: string;
  name: string;
};

export interface IChannelRepository {
  get(channelId: string): Promise<Channel | Error>;
  save(channel: Channel): Promise<void | Error>;
  update(channel: Channel): Promise<void | Error>;
  delete(channelId: string): Promise<void | Error>;
  getChannels(): Promise<Error | Channel[]>;
  getChannelIds(channelIds: string[]): Promise<string[] | Error>;
  getCategoriesByChannel(channelId: string): Promise<CategoryInfo[] | Error>;
  getChannelsBySearchTerm(searchTerm: string): Promise<Channel[] | Error>;
  addCategoryToChannel(
    channelId: string,
    categoryId: string,
  ): Promise<void | Error>;
  deleteCategoryFromChannel(
    channelId: string,
    categoryId: string,
  ): Promise<void | Error>;
}
