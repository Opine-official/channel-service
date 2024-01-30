import { GetCategories } from './src/application/use-cases/GetCategories';
import { GetChannelsBySearchTerm } from './src/application/use-cases/GetChannelsBySearchTerm';
import { SaveCategory } from './src/application/use-cases/SaveCategory';
import { SaveChannel } from './src/application/use-cases/SaveChannel';
import { VerifyUser } from './src/application/use-cases/VerifyUser';
import { DatabaseConnection } from './src/infrastructure/database/Connection';
import { CategoryRepository } from './src/infrastructure/repositories/CategoryRepository';
import { ChannelRepository } from './src/infrastructure/repositories/ChannelRepository';
import { Server } from './src/infrastructure/Server';
import run from './src/presentation/consumers/ChannelConsumer';
import { GetCategoriesController } from './src/presentation/controllers/GetCategoriesController';
import { GetChannelsBySearchTermController } from './src/presentation/controllers/GetChannelBySearchTermController';
import { SaveCategoryController } from './src/presentation/controllers/SaveCategoryController';
import { SaveChannelController } from './src/presentation/controllers/SaveChannelController';
import { VerifyUserController } from './src/presentation/controllers/VerifyUserController';

export async function main(): Promise<void> {
  await DatabaseConnection.connect();

  const categoryRepo = new CategoryRepository();
  const channelRepo = new ChannelRepository();

  const verifyUser = new VerifyUser();
  const saveCategory = new SaveCategory(categoryRepo, channelRepo);
  const saveChannel = new SaveChannel(channelRepo, categoryRepo);
  const getChannelsBySearchTerm = new GetChannelsBySearchTerm(channelRepo);
  const getCategories = new GetCategories(categoryRepo);

  const verifyUserController = new VerifyUserController(verifyUser);
  const saveCategoryController = new SaveCategoryController(saveCategory);
  const saveChannelController = new SaveChannelController(saveChannel);
  const getChannelsBySearchTermController =
    new GetChannelsBySearchTermController(getChannelsBySearchTerm);
  const getCategoriesController = new GetCategoriesController(getCategories);

  run();

  await Server.run(4003, {
    verifyUserController,
    saveCategoryController,
    saveChannelController,
    getChannelsBySearchTermController,
    getCategoriesController,
  });
}

main();
