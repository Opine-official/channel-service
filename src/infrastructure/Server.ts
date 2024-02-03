import express from 'express';
import cors from 'cors';
import { VerifyUserController } from '../presentation/controllers/VerifyUserController';
import cookieParser from 'cookie-parser';
import { SaveCategoryController } from '../presentation/controllers/SaveCategoryController';
import { SaveChannelController } from '../presentation/controllers/SaveChannelController';
import {
  authenticateToken,
  authenticateAdmin,
} from '@opine-official/authentication';
import { GetChannelsBySearchTermController } from '../presentation/controllers/GetChannelsBySearchTermController';
import { GetCategoriesController } from '../presentation/controllers/GetCategoriesController';
import { GetChannelsByCategoryController } from '../presentation/controllers/GetChannelsByCategoryController';
import { GetCategoryController } from '../presentation/controllers/GetCategoryController';
import { UpdateCategoryController } from '../presentation/controllers/UpdateCategoryController';
import { DeleteChannelFromCategoryController } from '../presentation/controllers/DeleteChannelFromCategoryController';
import { GetChannelsController } from '../presentation/controllers/GetChannelsController';
import { GetCategoriesByChannelController } from '../presentation/controllers/GetCategoriesByChannelController';
import { SaveChannelSubscribeController } from '../presentation/controllers/SaveChannelSubscribeController';
import { GetPostsByChannelController } from '../presentation/controllers/GetPostsByChannelController';
import { DeleteCategoryController } from '../presentation/controllers/DeleteCategoryController';
import { UpdateChannelController } from '../presentation/controllers/UpdateChannelController';
import { DeleteChannelController } from '../presentation/controllers/DeleteChannelController';
import { GetCategoriesBySearchTermController } from '../presentation/controllers/GetCategoriesBySearchTermController';

interface ServerControllers {
  verifyUserController: VerifyUserController;
  saveCategoryController: SaveCategoryController;
  getCategoryController: GetCategoryController;
  updateCategoryController: UpdateCategoryController;
  deleteCategoryController: DeleteCategoryController;
  getChannelsController: GetChannelsController;
  deleteChannelFromCategoryController: DeleteChannelFromCategoryController;
  saveChannelController: SaveChannelController;
  getChannelsBySearchTermController: GetChannelsBySearchTermController;
  getCategoriesBySearchTermController: GetCategoriesBySearchTermController;
  getCategoriesController: GetCategoriesController;
  getChannelsByCategoryController: GetChannelsByCategoryController;
  getCategoriesByChannelController: GetCategoriesByChannelController;
  deleteCategoryFromChannelController: DeleteChannelFromCategoryController;
  saveChannelSubscribeController: SaveChannelSubscribeController;
  getPostsByChannelController: GetPostsByChannelController;
  updateChannelController: UpdateChannelController;
  deleteChannelController: DeleteChannelController;
}

const corsOptions = {
  origin: 'https://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

export class Server {
  public static async run(
    port: number,
    controllers: ServerControllers,
  ): Promise<void> {
    const app = express();
    app.use(cookieParser());
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/test', (req, res) => res.send('Channel service is running'));

    app.get('/verifyUser', (req, res) => {
      controllers.verifyUserController.handle(req, res);
    });

    app
      .post('/', authenticateAdmin, (req, res) => {
        controllers.saveChannelController.handle(req, res);
      })
      .get('/', (req, res) => {
        controllers.getChannelsBySearchTermController.handle(req, res);
      })
      .put('/', authenticateAdmin, (req, res) => {
        controllers.updateChannelController.handle(req, res);
      })
      .delete('/', authenticateAdmin, (req, res) => {
        controllers.deleteChannelController.handle(req, res);
      });

    app.get('/search/categories', (req, res) => {
      controllers.getCategoriesBySearchTermController.handle(req, res);
    });

    app.post('/subscribe', authenticateToken, (req, res) => {
      controllers.saveChannelSubscribeController.handle(req, res);
    });

    // need admin verification

    app
      .get('/category', (req, res) => {
        controllers.getCategoriesController.handle(req, res);
      })
      .post('/category', authenticateAdmin, (req, res) => {
        controllers.saveCategoryController.handle(req, res);
      })
      .put('/category', authenticateAdmin, (req, res) => {
        controllers.updateCategoryController.handle(req, res);
      })
      .delete('/category', authenticateAdmin, (req, res) => {
        controllers.deleteCategoryController.handle(req, res);
      });

    app.patch('/categories/remove-channel', authenticateAdmin, (req, res) => {
      controllers.deleteChannelFromCategoryController.handle(req, res);
    });

    app.patch('/channels/remove-category', authenticateAdmin, (req, res) => {
      controllers.deleteCategoryFromChannelController.handle(req, res);
    });

    app.get('/categories', (req, res) => {
      controllers.getCategoriesController.handle(req, res);
    });

    app.get('/channels', (req, res) => {
      controllers.getChannelsController.handle(req, res);
    });

    app.get('/channelsByCategory', (req, res) => {
      controllers.getChannelsByCategoryController.handle(req, res);
    });

    app.get('/categoriesByChannel', (req, res) => {
      controllers.getCategoriesByChannelController.handle(req, res);
    });

    app.get('/postsByChannel', (req, res) => {
      controllers.getPostsByChannelController.handle(req, res);
    });

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
