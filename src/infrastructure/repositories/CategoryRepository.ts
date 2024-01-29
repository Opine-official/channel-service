import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { Category } from '../../domain/entities/Category';
import CategoryModel from '../models/CategoryModel';

export class CategoryRepository implements ICategoryRepository {
  public async save(category: Category): Promise<void | Error> {
    try {
      const categoryDocument = new CategoryModel({
        categoryId: category.categoryId,
        name: category.name,
        description: category.description,
        channels: category.channels,
      });

      await categoryDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while creating a new category');
    }
  }

  public async delete(categoryId: string): Promise<void | Error> {
    try {
      await CategoryModel.deleteOne({
        categoryId: categoryId,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while deleting');
    }
  }

  public async getCategoryIds(
    categoryIds: string[],
  ): Promise<string[] | Error> {
    try {
      const categories = await CategoryModel.find({
        categoryId: { $in: categoryIds },
      });

      return categories.map((category) => category._id.toString());
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching categories');
    }
  }

  // public async getCategories(): Promise<Error | Category[]> {
  //   try {
  //     const categories = await CategoryModel.find();
  //     return categories.map((category) => ({
  //       categoryId: category.categoryId,
  //       name: category.name,
  //       description: category.description,
  //       channels: category.channels,
  //     }));
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       return new Error(error.message);
  //     }

  //     return new Error('Something went wrong while fetching categories');
  //   }
  // }

  // public async getCategoryById(categoryId: string): Promise<Error | Category> {
}
