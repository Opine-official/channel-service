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

  // public async getChannels(): Promise<Error | Channel[]> {
  //   try {
  //     const channels = await ChannelModel.find();
  //     return channels.map((channel) => ({
  //       channelId: channel.channelId,
  //       name: channel.name,
  //       description: channel.description,
  //       categories: channel.categories,
  //       similar: channel.similar,
  //       followerCount: channel.followerCount,
  //     }));
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       return new Error(error.message);
  //     }

  //     return new Error('Something went wrong while fetching channels');
  //   }
  // }

  // public async getChannelById(channelId: string): Promise<Error | Channel> {
  //   try {
  //     const channel = await ChannelModel.findOne({
  //       channelId: channelId,
  //     });

  //     if (!channel) {
  //       return new Error('Channel not found');
  //     }

  //     return {
  //       channelId: channel.channelId,
  //       name: channel.name,
  //       description: channel.description,
  //       categories: channel.categories,
  //       similar: channel.similar,
  //       followerCount: channel.followerCount,
  //     };
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       return new Error(error.message);
  //     }

  //     return new Error('Something went wrong while fetching channel');
  //   }
  // }
}
