import { randomUUID } from 'crypto';

type CategoryParams = {
  categoryId?: string;
  name: string;
  description?: string;
  channels: string[];
};

export class Category {
  categoryId: string;
  name: string;
  description: string;
  channels: string[];

  constructor(params: CategoryParams) {
    this.categoryId = params.categoryId || randomUUID();
    this.name = params.name;
    this.description = params.description || '';
    this.channels = params.channels || [];
  }
}
