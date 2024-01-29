import { Category } from '../../domain/entities/Category';
import { ICategoryRepository } from '../../domain/interfaces/ICategoryRepository';
import { IChannelRepository } from '../../domain/interfaces/IChannelRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface ISaveCategoryDTO {
  name: string;
  description: string;
  channels: string[];
}

interface ISaveCategoryResult {
  categoryId: string;
}

export class SaveCategory
  implements IUseCase<ISaveCategoryDTO, ISaveCategoryResult>
{
  constructor(
    private readonly _categoryRepo: ICategoryRepository,
    private readonly _channelRepo: IChannelRepository,
  ) {}

  async execute(input: ISaveCategoryDTO): Promise<ISaveCategoryResult | Error> {
    const channelIds = await this._channelRepo.getChannelIds(input.channels);

    if (channelIds instanceof Error) {
      return channelIds;
    }

    const category = new Category({
      name: input.name,
      description: input.description,
      channels: channelIds,
    });

    const saveCategoryResult = await this._categoryRepo.save(category);

    if (saveCategoryResult instanceof Error) {
      return saveCategoryResult;
    }

    return {
      categoryId: category.categoryId,
    };
  }
}
