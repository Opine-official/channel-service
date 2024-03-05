import { IChannelSubscribeRepository } from '../../domain/interfaces/IChannelSubscribeRepository';
import { ChannelSubscribe } from '../../domain/entities/ChannelSubscribe';
import ChannelSubscribeModel from '../models/ChannelSubscribeModel';

export class ChannelSubscribeRepository implements IChannelSubscribeRepository {
  public async get(
    channelSubscribeId: string,
  ): Promise<Error | ChannelSubscribe> {
    try {
      const channelSubscribeDocument = await ChannelSubscribeModel.findOne({
        channelSubscribeId: channelSubscribeId,
      });

      if (!channelSubscribeDocument) {
        throw new Error('ChannelSubscribe not found');
      }

      return {
        channelSubscribeId: channelSubscribeDocument.channelSubscribeId,
        channelId: channelSubscribeDocument.channelId,
        channelName: channelSubscribeDocument.channelName,
        userId: channelSubscribeDocument.userId,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while getting');
    }
  }

  public async save(channelSubscribe: ChannelSubscribe): Promise<void | Error> {
    try {
      const channelSubscribeDocument = new ChannelSubscribeModel({
        channelSubscribeId: channelSubscribe.channelSubscribeId,
        channelId: channelSubscribe.channelId,
        channelName: channelSubscribe.channelName,
        userId: channelSubscribe.userId,
      });

      await channelSubscribeDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error(
        'Something went wrong while creating a new channelSubscribe',
      );
    }
  }

  public async update(
    channelSubscribe: ChannelSubscribe,
  ): Promise<void | Error> {
    try {
      const channelSubscribeDocument = new ChannelSubscribeModel({
        channelSubscribeId: channelSubscribe.channelSubscribeId,
        channelId: channelSubscribe.channelId,
        channelName: channelSubscribe.channelName,
        userId: channelSubscribe.userId,
      });

      await channelSubscribeDocument.updateOne(channelSubscribeDocument);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while updating');
    }
  }

  public async delete(channelSubscribeId: string): Promise<void | Error> {
    try {
      await ChannelSubscribeModel.deleteOne({
        channelSubscribeId: channelSubscribeId,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while deleting');
    }
  }

  public async isSubscribed(
    userId: string | null,
    channelId: string,
  ): Promise<Error | boolean> {
    try {
      if (!userId) {
        throw new Error('User not found');
      }

      const channelSubscribeDocument = await ChannelSubscribeModel.findOne({
        userId: userId,
        channelId: channelId,
      });

      if (!channelSubscribeDocument) {
        return false;
      }

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while checking');
    }
  }

  public async getChannelSubscribeId(
    userId: string,
    channelId: string,
  ): Promise<Error | string> {
    try {
      const channelSubscribeDocument = await ChannelSubscribeModel.findOne({
        userId: userId,
        channelId: channelId,
      });

      if (!channelSubscribeDocument) {
        throw new Error('ChannelSubscribe not found');
      }

      return channelSubscribeDocument.channelSubscribeId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error(
        'Something went wrong while getting ChannelSubscribe id',
      );
    }
  }
}
