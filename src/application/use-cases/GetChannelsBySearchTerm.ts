import { Channel } from '../../domain/entities/Channel';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetChannelsBySearchTermDTO {
  searchTerm: string;
}

interface IGetChannelsBySearchTermResult {
  channels: Channel[];
}

export class GetChannelsBySearchTerm
  implements
    IUseCase<IGetChannelsBySearchTermDTO, IGetChannelsBySearchTermResult>
{
  constructor(private readonly _channelRepo: IChannelRepository) {}

  async execute(
    input: IGetChannelsBySearchTermDTO,
  ): Promise<IGetChannelsBySearchTermResult | Error> {
    const channels = await this._channelRepo.getChannelsBySearchTerm(
      input.searchTerm,
    );

    if (channels instanceof Error) {
      return channels;
    }

    return {
      channels,
    };
  }
}
