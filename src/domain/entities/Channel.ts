import { randomUUID } from 'crypto';

type ChannelParams = {
  channelId?: string;
  name: string;
  description?: string;
  categories: string[];
  similar: string[];
  followerCount: number;
};

export class Channel {
  channelId: string;
  name: string;
  description: string;
  categories: string[];
  similar: string[];
  followerCount: number;

  constructor(params: ChannelParams) {
    this.channelId = params.channelId || randomUUID();
    this.name = params.name;
    this.description = params.description || '';
    this.categories = params.categories || [];
    this.similar = params.similar || [];
    this.followerCount = params.followerCount;
  }
}
