import { randomUUID } from 'crypto';

type ChannelSubscribeParams = {
  channelSubscribeId?: string;
  channelId: string;
  channelName: string;
  userId: string;
};

export class ChannelSubscribe {
  channelSubscribeId: string;
  channelId: string;
  channelName: string;
  userId: string;

  constructor(params: ChannelSubscribeParams) {
    this.channelSubscribeId = params.channelSubscribeId || randomUUID();
    this.channelId = params.channelId;
    this.channelName = params.channelName;
    this.userId = params.userId;
  }
}
