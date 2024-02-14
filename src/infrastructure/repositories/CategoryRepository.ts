import {
  CategoryWithChannels,
  ChannelInfo,
  ICategoryRepository,
} from '../../domain/interfaces/ICategoryRepository';
import { Category } from '../../domain/entities/Category';
import CategoryModel from '../models/CategoryModel';

export class CategoryRepository implements ICategoryRepository {
  public async save(category: Category): Promise<string | Error> {
    try {
      const categoryDocument = new CategoryModel({
        categoryId: category.categoryId,
        name: category.name,
        description: category.description,
        channels: category.channels,
      });

      await categoryDocument.save();
      return categoryDocument._id.toString();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while creating a new category');
    }
  }

  public async get(categoryId: string): Promise<Error | Category> {
    try {
      const categoryDocument = await CategoryModel.findOne({
        categoryId: categoryId,
      });

      if (!categoryDocument) {
        throw new Error('Category not found');
      }

      return {
        categoryId: categoryDocument.categoryId,
        name: categoryDocument.name,
        description: categoryDocument.description ?? '',
        channels:
          categoryDocument.channels.map((chan) => chan.toString()) ?? [],
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while getting');
    }
  }

  public async update(category: Category): Promise<void | Error> {
    try {
      await CategoryModel.updateOne(
        { categoryId: category.categoryId },
        {
          $set: {
            name: category.name,
            description: category.description,
          },
          $addToSet: {
            channels: { $each: category.channels },
          },
        },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while updating the category');
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

  public async addChannelToCategory(
    category_id: string,
    channel_id: string,
  ): Promise<void | Error> {
    try {
      await CategoryModel.updateOne(
        { _id: category_id },
        { $addToSet: { channels: channel_id } },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while adding channel to category');
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

  public async getCategories(): Promise<Error | Category[]> {
    try {
      const categories = await CategoryModel.find();

      return categories.map((category) => ({
        categoryId: category.categoryId,
        name: category.name,
        description: category.description ?? '',
        channels: category.channels
          ? category.channels.map((channel) => channel.toString())
          : [],
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching categories');
    }
  }

  public async getCategoriesBySearchTerm(
    searchTerm: string,
  ): Promise<Category[] | Error> {
    try {
      const categories = await CategoryModel.find({
        name: { $regex: searchTerm, $options: 'i' },
      }).select('categoryId name description channels subscriberCount');

      const newCategories = categories.map((category) => {
        return new Category({
          categoryId: category.categoryId,
          name: category.name,
          description: category.description ?? '',
          channels: category.channels
            ? category.channels.map((channel) => channel.toString())
            : [],
        });
      });

      return newCategories;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching categories');
    }
  }

  public async deleteChannelFromCategory(
    categoryId: string,
    channelId: string,
  ): Promise<void | Error> {
    try {
      await CategoryModel.updateOne(
        { categoryId: categoryId },
        { $pull: { channels: channelId } },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while deleting');
    }
  }

  public async getChannelsByCategory(
    categoryId: string,
  ): Promise<ChannelInfo[] | Error> {
    try {
      const category = await CategoryModel.findOne({
        categoryId: categoryId,
      }).populate({
        path: 'channels',
        select: 'channelId name -_id',
      });
      if (!category) {
        throw new Error('Category not found');
      }
      return (category.channels as unknown as ChannelInfo[]).map((channel) => ({
        channelId: channel.channelId,
        name: channel.name,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
    }
  }

  public async getMongoIdFromCategoryId(
    categoryId: string,
  ): Promise<string | Error> {
    try {
      const category = await CategoryModel.findOne({
        categoryId: categoryId,
      });
      if (!category) {
        throw new Error('Category not found');
      }
      return category._id.toString();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
    }
  }

  public async getAllCategoriesWithChannels(): Promise<
    Error | CategoryWithChannels[]
  > {
    try {
      const categories = await CategoryModel.find().populate('channels');

      const result: CategoryWithChannels[] = categories.map((category) => ({
        categoryId: category.categoryId,
        name: category.name,
        description: category.description ?? '',
        channels: category.channels.map((channel: unknown) => {
          const typedChannel = channel as ChannelInfo;
          return {
            channelId: typedChannel.channelId,
            name: typedChannel.name,
          };
        }),
      }));

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while fetching categories');
    }
  }
}
