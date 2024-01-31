import { DeleteChannelFromCategory } from './src/application/use-cases/DeleteChannelFromCategory';
import { GetCategories } from './src/application/use-cases/GetCategories';
import { GetCategoriesByChannel } from './src/application/use-cases/GetCategoriesByChannel';
import { GetCategory } from './src/application/use-cases/GetCategory';
import { GetChannels } from './src/application/use-cases/GetChannels';
import { GetChannelsByCategory } from './src/application/use-cases/GetChannelsByCategory';
import { GetChannelsBySearchTerm } from './src/application/use-cases/GetChannelsBySearchTerm';
import { SaveCategory } from './src/application/use-cases/SaveCategory';
import { SaveChannel } from './src/application/use-cases/SaveChannel';
import { UpdateCategory } from './src/application/use-cases/UpdateCategory';
import { VerifyUser } from './src/application/use-cases/VerifyUser';
import { DatabaseConnection } from './src/infrastructure/database/Connection';
import { CategoryRepository } from './src/infrastructure/repositories/CategoryRepository';
import { ChannelRepository } from './src/infrastructure/repositories/ChannelRepository';
import { Server } from './src/infrastructure/Server';
import run from './src/presentation/consumers/ChannelConsumer';
import { DeleteChannelFromCategoryController } from './src/presentation/controllers/DeleteChannelFromCategoryController';
import { GetCategoriesByChannelController } from './src/presentation/controllers/GetCategoriesByChannelController';
import { GetCategoriesController } from './src/presentation/controllers/GetCategoriesController';
import { GetCategoryController } from './src/presentation/controllers/GetCategoryController';
import { GetChannelsBySearchTermController } from './src/presentation/controllers/GetChannelBySearchTermController';
import { GetChannelsByCategoryController } from './src/presentation/controllers/GetChannelsByCategoryController';
import { GetChannelsController } from './src/presentation/controllers/GetChannelsController';
import { SaveCategoryController } from './src/presentation/controllers/SaveCategoryController';
import { SaveChannelController } from './src/presentation/controllers/SaveChannelController';
import { UpdateCategoryController } from './src/presentation/controllers/UpdateCategoryController';
import { VerifyUserController } from './src/presentation/controllers/VerifyUserController';

export async function main(): Promise<void> {
  await DatabaseConnection.connect();

  const categoryRepo = new CategoryRepository();
  const channelRepo = new ChannelRepository();

  const verifyUser = new VerifyUser();
  const saveCategory = new SaveCategory(categoryRepo, channelRepo);
  const saveChannel = new SaveChannel(channelRepo, categoryRepo);
  const getCategory = new GetCategory(categoryRepo);
  const updateCategory = new UpdateCategory(categoryRepo, channelRepo);
  const getChannelsBySearchTerm = new GetChannelsBySearchTerm(channelRepo);
  const getCategories = new GetCategories(categoryRepo);
  const getChannelsByCategory = new GetChannelsByCategory(categoryRepo);
  const deleteChannelFromCategory = new DeleteChannelFromCategory(
    categoryRepo,
    channelRepo,
  );
  const getChannels = new GetChannels(channelRepo);
  const getCategoriesByChannel = new GetCategoriesByChannel(channelRepo);
  const deleteCategoryFromChannel = new DeleteChannelFromCategory(
    categoryRepo,
    channelRepo,
  );

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
  const updateCategoryController = new UpdateCategoryController(updateCategory);
  const deleteChannelFromCategoryController =
    new DeleteChannelFromCategoryController(deleteChannelFromCategory);
  const getChannelsController = new GetChannelsController(getChannels);
  const getCategoriesByChannelController = new GetCategoriesByChannelController(
    getCategoriesByChannel,
  );
  const deleteCategoryFromChannelController =
    new DeleteChannelFromCategoryController(deleteCategoryFromChannel);

  run();

  await Server.run(4003, {
    verifyUserController,
    saveCategoryController,
    getCategoryController,
    saveChannelController,
    getChannelsBySearchTermController,
    getCategoriesController,
    getChannelsByCategoryController,
    updateCategoryController,
    deleteChannelFromCategoryController,
    getChannelsController,
    getCategoriesByChannelController,
    deleteCategoryFromChannelController,
  });
}

main();
