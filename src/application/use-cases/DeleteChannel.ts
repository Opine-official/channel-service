import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IDeleteChannelDTO {
  channelId: string;
}

interface IDeleteChannelResult {
  channelId: string;
}

export class DeleteChannel
  implements IUseCase<IDeleteChannelDTO, IDeleteChannelResult>
{
  public constructor(private readonly _channelRepo: IChannelRepository) {}

  public async execute(
    input: IDeleteChannelDTO,
  ): Promise<IDeleteChannelResult | Error> {
    const deleteChannelResult = await this._channelRepo.delete(input.channelId);

    if (deleteChannelResult instanceof Error) {
      return deleteChannelResult;
    }

    return {
      channelId: input.channelId,
    };
  }
}
