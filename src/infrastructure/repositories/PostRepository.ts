import {
  IPostRepository,
  PostResult,
  User,
} from '../../domain/interfaces/IPostRepository';
import { Post } from '../../domain/entities/Post';
import PostModel from '../models/PostModel';
// import { User } from '../../domain/entities/User';

export class PostRepository implements IPostRepository {
  public async save(post: Post): Promise<Error | void> {
    try {
      const postDocument = new PostModel({
        postId: post.postId,
        title: post.title,
        description: post.description,
        user: post.user,
        tags: post.tags,
        slug: post.slug,
      });

      await postDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while creating a new post');
    }
  }

  public async delete(slug: string): Promise<void | Error> {
    try {
      await PostModel.deleteOne({
        slug: slug,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while deleting');
    }
  }

  public async getPostsByChannel(
    channelName: string,
  ): Promise<PostResult[] | Error> {
    try {
      const posts = await PostModel.find({
        tags: { $regex: new RegExp(`^${channelName}$`, 'i') },
      }).populate('user', 'name username profile userId bio');

      if (posts.length === 0) {
        throw new Error('No posts found');
      }

      const result: PostResult[] = posts.map((post) => ({
        postId: post.postId!,
        title: post.title!,
        description: post.description!,
        user: post.user as unknown as User,
        tags: post.tags!,
        slug: post.slug!,
        postedOn: post.postedOn!,
      }));

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while getting posts by channel');
    }
  }

  public async findByTag(tag: string): Promise<PostResult[] | Error> {
    try {
      const posts = await PostModel.find({ tags: tag }).populate(
        'user',
        'name username profile userId',
      );

      const result: PostResult[] = posts.map((post) => ({
        postId: post.postId!,
        title: post.title!,
        description: post.description!,
        user: post.user as unknown as User,
        tags: post.tags!,
        slug: post.slug!,
        postedOn: post.postedOn!,
      }));

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong while searching posts by tag');
    }
  }
}
