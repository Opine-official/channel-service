import { Category } from '../entities/Category';

export type ChannelInfo = {
  channelId: string;
  name: string;
};

export interface ICategoryRepository {
  get(categoryId: string): Promise<Category | Error>;
  save(category: Category): Promise<void | Error>;
  update(category: Category): Promise<void | Error>;
  delete(categoryId: string): Promise<void | Error>;
  getCategories(): Promise<Error | Category[]>;
  getCategoryIds(categoryIds: string[]): Promise<string[] | Error>;
  getChannelsByCategory(categoryId: string): Promise<ChannelInfo[] | Error>;
  deleteChannelFromCategory(
    categoryId: string,
    channelId: string,
  ): Promise<void | Error>;
}
