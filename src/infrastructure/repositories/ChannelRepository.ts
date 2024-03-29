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
        subscriberCount: channelDocument.subscriberCount,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while getting');
    }
  }

  public async save(channel: Channel): Promise<string | Error> {
    try {
      const channelDocument = new ChannelModel({
        channelId: channel.channelId,
        name: channel.name,
        description: channel.description,
        categories: channel.categories,
        subscriberCount: channel.subscriberCount,
      });

      await channelDocument.save();

      return channelDocument._id.toString();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while creating a new channel');
    }
  }

  public async update(channel: Channel): Promise<void | Error> {
    try {
      await ChannelModel.updateOne(
        { channelId: channel.channelId },
        {
          $set: {
            name: channel.name,
            description: channel.description,
            // subscriberCount: channel.subscriberCount, // Commented out as you mentioned you don't want to update subscriberCount
          },
          $push: {
            categories: {
              $each: channel.categories,
            },
          },
        },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while updating the channel');
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

  public async incrementSubscriberCount(
    channelId: string,
  ): Promise<void | Error> {
    try {
      await ChannelModel.updateOne(
        { channelId: channelId },
        { $inc: { subscriberCount: 1 } },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error(
        'Something went wrong while incrementing subscriber count',
      );
    }
  }

  public async decrementSubscriberCount(
    channelId: string,
  ): Promise<void | Error> {
    try {
      await ChannelModel.updateOne(
        {
          channelId: channelId,
        },
        {
          $inc: {
            subscriberCount: -1,
          },
        },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
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
        subscriberCount: channel.subscriberCount,
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
      }).select('channelId name description categories subscriberCount');

      const newChannels = channels.map((channel) => {
        return new Channel({
          channelId: channel.channelId,
          name: channel.name,
          description: channel.description ?? '',
          categories: channel.categories
            ? channel.categories.map((category) => category.toString())
            : [],
          subscriberCount: channel.subscriberCount,
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
    category_id: string,
    channel_id: string,
  ): Promise<void | Error> {
    try {
      await ChannelModel.updateOne(
        { _id: channel_id },
        { $addToSet: { categories: category_id } },
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

  public async getChannelIdFromName(
    channelName: string,
  ): Promise<string | Error> {
    try {
      const channel = await ChannelModel.findOne(
        { name: { $regex: new RegExp(`^${channelName}$`, 'i') } },
        { channelId: 1, _id: 0 },
      );

      if (!channel) {
        throw new Error('Channel not found');
      }

      return channel.channelId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
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

  public async topChannels(): Promise<Channel[] | Error> {
    try {
      const channels = await ChannelModel.find()
        .sort({ subscriberCount: -1 })
        .limit(5);

      return channels.map((channel) => ({
        channelId: channel.channelId,
        name: channel.name,
        description: channel.description ?? '',
        categories: channel.categories
          ? channel.categories.map((category) => category.toString())
          : [],
        subscriberCount: channel.subscriberCount,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while fetching channels');
    }
  }
}
