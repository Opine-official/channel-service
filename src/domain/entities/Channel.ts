import { randomUUID } from 'crypto';

type ChannelParams = {
  channelId?: string;
  name: string;
  description?: string;
  categories: string[];
  subscriberCount?: number;
};

export class Channel {
  channelId: string;
  name: string;
  description: string;
  categories: string[];
  subscriberCount: number;

  constructor(params: ChannelParams) {
    this.channelId = params.channelId || randomUUID();
    this.name = params.name;
    this.description = params.description || '';
    this.categories = params.categories || [];
    this.subscriberCount = params.subscriberCount || 0;
  }
}
