import { GetCategories } from './src/application/use-cases/GetCategories';
import { GetCategory } from './src/application/use-cases/GetCategory';
import { GetChannelsByCategory } from './src/application/use-cases/GetChannelsByCategory';
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
import { GetCategoryController } from './src/presentation/controllers/GetCategoryController';
import { GetChannelsBySearchTermController } from './src/presentation/controllers/GetChannelBySearchTermController';
import { GetChannelsByCategoryController } from './src/presentation/controllers/GetChannelsByCategoryController';
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
  const getCategory = new GetCategory(categoryRepo);
  const getChannelsBySearchTerm = new GetChannelsBySearchTerm(channelRepo);
  const getCategories = new GetCategories(categoryRepo);
  const getChannelsByCategory = new GetChannelsByCategory(categoryRepo);

  const verifyUserController = new VerifyUserController(verifyUser);
  const saveCategoryController = new SaveCategoryController(saveCategory);
  const saveChannelController = new SaveChannelController(saveChannel);
  const getCategoryController = new GetCategoryController(getCategory);
  const getChannelsBySearchTermController =
    new GetChannelsBySearchTermController(getChannelsBySearchTerm);
  const getCategoriesController = new GetCategoriesController(getCategories);
  const getChannelsByCategoryController = new GetChannelsByCategoryController(
    getChannelsByCategory,
  );

  run();

  await Server.run(4003, {
    verifyUserController,
    saveCategoryController,
    getCategoryController,
    saveChannelController,
    getChannelsBySearchTermController,
    getCategoriesController,
    getChannelsByCategoryController,
  });
}

main();
