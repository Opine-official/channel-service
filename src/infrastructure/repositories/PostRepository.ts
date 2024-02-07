import { IPostRepository } from '../../domain/interfaces/IPostRepository';
import { Post } from '../../domain/entities/Post';
import PostModel from '../models/PostModel';

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

  public async getPostsByChannel(channelName: string): Promise<Post[] | Error> {
    try {
      const posts = await PostModel.find({
        tags: { $in: [channelName] },
      });

      if (posts.length === 0) {
        throw new Error('No posts found');
      }

      return posts.map((post) => ({
        postId: post.postId,
        title: post.title,
        description: post.description,
        user: post.user.toString(),
        tags: post.tags,
        slug: post.slug,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while getting posts by channel');
    }
  }

  public async getPostsByTags(tags: string[]): Promise<Post[] | Error> {
    try {
      const posts = await PostModel.find({ tags: { $in: tags } })
        .limit(2)
        .exec();

      if (posts.length === 0) {
        throw new Error('no posts found');
      }

      return posts.map((post) => ({
        postId: post.postId,
        title: post.title,
        description: post.description,
        user: post.user.toString(),
        tags: post.tags,
        slug: post.slug,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }

      return new Error('Something went wrong while getting posts by channel');
    }
  }
}
