import {
  CategoryInfo,
  IChannelRepository,
} from '../../domain/interfaces/IChannelRepository';
import { Channel } from '../../domain/entities/Channel';
import ChannelModel from '../models/ChannelModel';

export class ChannelRepository implements IChannelRepository {
  public async get(channelId: string): Promise<Error | Channel> {
    try {
      const channelDocument = await ChannelModel.findOne({
        channelId: channelId,
      });

      if (!channelDocument) {
        throw new Error('Channel not found');
      }

      return {
        channelId: channelDocument.channelId,
        name: channelDocument.name,
        description: channelDocument.description ?? '',
        categories:
          channelDocument.categories.map((cat) => cat.toString()) ?? [],
        followerCount: channelDocument.followerCount,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while getting');
    }
  }

  public async save(channel: Channel): Promise<void | Error> {
    try {
      const channelDocument = new ChannelModel({
        channelId: channel.channelId,
        name: channel.name,
        description: channel.description,
        categories: channel.categories,
        followerCount: channel.followerCount,
      });

      await channelDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while creating a new channel');
    }
  }

  public async update(channel: Channel): Promise<void | Error> {
    try {
      const channelDocument = new ChannelModel({
        channelId: channel.channelId,
        name: channel.name,
        description: channel.description,
        categories: channel.categories,
        followerCount: channel.followerCount,
      });

      await channelDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while updating');
    }
  }

  public async delete(channelId: string): Promise<void | Error> {
    try {
      await ChannelModel.deleteOne({
        channelId: channelId,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while deleting');
    }
  }

  public async getChannels(): Promise<Error | Channel[]> {
    try {
      const channels = await ChannelModel.find();

      return channels.map((channel) => ({
        channelId: channel.channelId,
        name: channel.name,
        description: channel.description ?? '',
        categories: channel.categories
          ? channel.categories.map((category) => category.toString())
          : [],
        followerCount: channel.followerCount,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
    }
  }

  public async getChannelIds(channelIds: string[]): Promise<string[] | Error> {
    try {
      const channels = await ChannelModel.find({
        channelId: { $in: channelIds },
      });

      return channels.map((channel) => channel._id.toString());
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
    }
  }

  public async getCategoriesByChannel(
    channelId: string,
  ): Promise<CategoryInfo[] | Error> {
    try {
      const channels = await ChannelModel.findOne({
        channelId: channelId,
      }).populate({
        path: 'categories',
        select: 'categoryId name -_id',
      });

      if (!channels) {
        throw new Error('Channel not found');
      }

      return (channels.categories as unknown as CategoryInfo[]).map(
        (category) => ({
          categoryId: category.categoryId,
          name: category.name,
        }),
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
    }
  }

  public async getChannelsBySearchTerm(
    searchTerm: string,
  ): Promise<Channel[] | Error> {
    try {
      const channels = await ChannelModel.find({
        name: { $regex: searchTerm, $options: 'i' },
      }).select('channelId name description categories followerCount');

      const newChannels = channels.map((channel) => {
        return new Channel({
          channelId: channel.channelId,
          name: channel.name,
          description: channel.description ?? '',
          categories: channel.categories
            ? channel.categories.map((category) => category.toString())
            : [],
          followerCount: channel.followerCount,
        });
      });

      return newChannels;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
    }
  }

  public async addCategoryToChannel(
    channelId: string,
    categoryId: string,
  ): Promise<void | Error> {
    try {
      await ChannelModel.updateOne(
        { channelId: channelId },
        { $addToSet: { categories: categoryId } },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while adding category to channel');
    }
  }

  public async deleteCategoryFromChannel(
    channelId: string,
    categoryId: string,
  ): Promise<void | Error> {
    try {
      await ChannelModel.updateOne(
        { channelId: channelId },
        { $pull: { categories: categoryId } },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error(
        'Something went wrong while delete category from channel',
      );
    }
  }

  public async getMongoIdFromChannelId(
    channelId: string,
  ): Promise<string | Error> {
    try {
      const channel = await ChannelModel.findOne({ channelId: channelId });

      if (!channel) {
        throw new Error('Channel not found');
      }

      return channel._id.toString();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
    }
  }
}
