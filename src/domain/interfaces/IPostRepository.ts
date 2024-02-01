import { Post } from '../entities/Post';

export interface IPostRepository {
  save(post: Post): Promise<void | Error>;
  delete(slug: string): Promise<void | Error>;
  getPostsByChannel(channelName: string): Promise<Post[] | Error>;
}
