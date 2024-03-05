import { DeleteCategory } from './src/application/use-cases/DeleteCategory';
import { DeleteChannel } from './src/application/use-cases/DeleteChannel';
import { DeleteChannelFromCategory } from './src/application/use-cases/DeleteChannelFromCategory';
import { GetCategories } from './src/application/use-cases/GetCategories';
import { GetCategoriesByChannel } from './src/application/use-cases/GetCategoriesByChannel';
import { GetCategory } from './src/application/use-cases/GetCategory';
import { GetChannels } from './src/application/use-cases/GetChannels';
import { GetChannelsByCategory } from './src/application/use-cases/GetChannelsByCategory';
import { GetChannelsBySearchTerm } from './src/application/use-cases/GetChannelsBySearchTerm';
import { GetPostsByChannel } from './src/application/use-cases/GetPostsByChannel';
import { SaveCategory } from './src/application/use-cases/SaveCategory';
import { SaveChannel } from './src/application/use-cases/SaveChannel';
import { SaveChannelSubscribe } from './src/application/use-cases/SaveChannelSubscribe';
import { UpdateCategory } from './src/application/use-cases/UpdateCategory';
import { UpdateChannel } from './src/application/use-cases/UpdateChannel';
import { VerifyUser } from './src/application/use-cases/VerifyUser';
import { KafkaMessageProducer } from './src/infrastructure/brokers/kafka/KafkaMessageProducer';
import { DatabaseConnection } from './src/infrastructure/database/Connection';
import { CategoryRepository } from './src/infrastructure/repositories/CategoryRepository';
import { ChannelRepository } from './src/infrastructure/repositories/ChannelRepository';
import { ChannelSubscribeRepository } from './src/infrastructure/repositories/ChannelSubscribeRepository';
import { PostRepository } from './src/infrastructure/repositories/PostRepository';
import { Server } from './src/infrastructure/Server';
import run from './src/presentation/consumers/ChannelConsumer';
import { DeleteCategoryController } from './src/presentation/controllers/DeleteCategoryController';
import { DeleteChannelController } from './src/presentation/controllers/DeleteChannelController';
import { DeleteChannelFromCategoryController } from './src/presentation/controllers/DeleteChannelFromCategoryController';
import { GetCategoriesByChannelController } from './src/presentation/controllers/GetCategoriesByChannelController';
import { GetCategoriesController } from './src/presentation/controllers/GetCategoriesController';
import { GetCategoryController } from './src/presentation/controllers/GetCategoryController';
import { GetChannelsBySearchTermController } from './src/presentation/controllers/GetChannelsBySearchTermController';
import { GetChannelsByCategoryController } from './src/presentation/controllers/GetChannelsByCategoryController';
import { GetChannelsController } from './src/presentation/controllers/GetChannelsController';
import { GetPostsByChannelController } from './src/presentation/controllers/GetPostsByChannelController';
import { SaveCategoryController } from './src/presentation/controllers/SaveCategoryController';
import { SaveChannelController } from './src/presentation/controllers/SaveChannelController';
import { SaveChannelSubscribeController } from './src/presentation/controllers/SaveChannelSubscribeController';
import { UpdateCategoryController } from './src/presentation/controllers/UpdateCategoryController';
import { UpdateChannelController } from './src/presentation/controllers/UpdateChannelController';
import { VerifyUserController } from './src/presentation/controllers/VerifyUserController';
import { GetCategoriesBySearchTerm } from './src/application/use-cases/GetCategoriesBySearchTerm';
import { GetCategoriesBySearchTermController } from './src/presentation/controllers/GetCategoriesBySearchTermController';
import { GetChannel } from './src/application/use-cases/GetChannel';
import { GetChannelController } from './src/presentation/controllers/GetChannelController';
import { DeleteChannelSubscribe } from './src/application/use-cases/DeleteChannelSubscribe';
import { DeleteChannelSubscribeController } from './src/presentation/controllers/DeleteChannelSubscribeController';
import { GetTopChannels } from './src/application/use-cases/GetTopChannels';
import { GetTopChannelsController } from './src/presentation/controllers/GetTopChannelsController';

export async function main(): Promise<void> {
  await DatabaseConnection.connect();

  const postRepo = new PostRepository();
  const categoryRepo = new CategoryRepository();
  const channelRepo = new ChannelRepository();
  const channelSubscribeRepo = new ChannelSubscribeRepository();
  const messageProducer = new KafkaMessageProducer();

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
  const saveChannelSubscribe = new SaveChannelSubscribe(
    channelSubscribeRepo,
    channelRepo,
    messageProducer,
  );
  const deleteChannelSubscribe = new DeleteChannelSubscribe(
    channelSubscribeRepo,
    channelRepo,
    messageProducer,
  );
  const getPostsByChannel = new GetPostsByChannel(postRepo);
  const deleteCategory = new DeleteCategory(categoryRepo);
  const getChannel = new GetChannel(channelRepo, channelSubscribeRepo);
  const updateChannel = new UpdateChannel(categoryRepo, channelRepo);
  const deleteChannel = new DeleteChannel(channelRepo);
  const getCategoriesBySearchTerm = new GetCategoriesBySearchTerm(categoryRepo);
  const getTopChannel = new GetTopChannels(channelRepo);

  // * ----------------------------------

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
  const saveChannelSubscribeController = new SaveChannelSubscribeController(
    saveChannelSubscribe,
  );
  const getPostsByChannelController = new GetPostsByChannelController(
    getPostsByChannel,
  );
  const deleteCategoryController = new DeleteCategoryController(deleteCategory);
  const getChannelController = new GetChannelController(getChannel);
  const updateChannelController = new UpdateChannelController(updateChannel);
  const deleteChannelController = new DeleteChannelController(deleteChannel);
  const getCategoriesBySearchTermController =
    new GetCategoriesBySearchTermController(getCategoriesBySearchTerm);
  const deleteChannelSubscribeController = new DeleteChannelSubscribeController(
    deleteChannelSubscribe,
  );
  const getTopChannelsController = new GetTopChannelsController(getTopChannel);

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
    saveChannelSubscribeController,
    getPostsByChannelController,
    deleteCategoryController,
    updateChannelController,
    deleteChannelController,
    getCategoriesBySearchTermController,
    getChannelController,
    deleteChannelSubscribeController,
    getTopChannelsController,
  });
}

main();
