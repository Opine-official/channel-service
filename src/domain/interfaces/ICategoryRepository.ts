import { Category } from '../entities/Category';

export type ChannelInfo = {
  channelId: string;
  name: string;
};

export interface ICategoryRepository {
  save(category: Category): Promise<void | Error>;
  delete(categoryId: string): Promise<void | Error>;
  getCategories(): Promise<Error | Category[]>;
  // getCategoryById(categoryId: string): Promise<Error | Category>;
  getCategoryIds(categoryIds: string[]): Promise<string[] | Error>;
  getChannelsByCategory(categoryId: string): Promise<ChannelInfo[] | Error>;
}
