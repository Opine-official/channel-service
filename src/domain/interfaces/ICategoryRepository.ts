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
  getCategoriesBySearchTerm(searchTerm: string): Promise<Category[] | Error>;
  getCategoryIds(categoryIds: string[]): Promise<string[] | Error>;
  getChannelsByCategory(categoryId: string): Promise<ChannelInfo[] | Error>;
  deleteChannelFromCategory(
    categoryId: string,
    id: string,
  ): Promise<void | Error>;
  getMongoIdFromCategoryId(categoryId: string): Promise<string | Error>;
}
