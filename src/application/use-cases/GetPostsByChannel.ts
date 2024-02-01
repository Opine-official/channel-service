import { Post } from '../../domain/entities/Post';
import { IPostRepository } from '../../domain/interfaces/IPostRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetPostsByChannelDTO {
  channelName: string;
}

interface IGetPostsByChannelResults {
  posts: Post[];
}

export class GetPostsByChannel
  implements IUseCase<IGetPostsByChannelDTO, IGetPostsByChannelResults>
{
  constructor(private readonly _postRepo: IPostRepository) {}

  async execute(
    input: IGetPostsByChannelDTO,
  ): Promise<IGetPostsByChannelResults | Error> {
    const posts = await this._postRepo.getPostsByChannel(input.channelName);

    if (posts instanceof Error) {
      return posts;
    }

    return { posts: posts };
  }
}
