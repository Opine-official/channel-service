import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { Channel } from '../../domain/entities/Channel';
import ChannelModel from '../models/ChannelModel';

export class ChannelRepository implements IChannelRepository {
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
}
