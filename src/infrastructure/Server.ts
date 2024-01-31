import express from 'express';
import cors from 'cors';
import { VerifyUserController } from '../presentation/controllers/VerifyUserController';
import cookieParser from 'cookie-parser';
import { SaveCategoryController } from '../presentation/controllers/SaveCategoryController';
import { SaveChannelController } from '../presentation/controllers/SaveChannelController';
import { authenticateToken } from '@opine-official/authentication';
import { GetChannelsBySearchTermController } from '../presentation/controllers/GetChannelBySearchTermController';
import { GetCategoriesController } from '../presentation/controllers/GetCategoriesController';
import { GetChannelsByCategoryController } from '../presentation/controllers/GetChannelsByCategoryController';
import { GetCategoryController } from '../presentation/controllers/GetCategoryController';
import { UpdateCategoryController } from '../presentation/controllers/UpdateCategoryController';
import { DeleteChannelFromCategoryController } from '../presentation/controllers/DeleteChannelFromCategoryController';
import { GetChannelsController } from '../presentation/controllers/GetChannelsController';
import { GetCategoriesByChannelController } from '../presentation/controllers/GetCategoriesByChannelController';

interface ServerControllers {
  verifyUserController: VerifyUserController;
  saveCategoryController: SaveCategoryController;
  getCategoryController: GetCategoryController;
  updateCategoryController: UpdateCategoryController;
  getChannelsController: GetChannelsController;
  deleteChannelFromCategoryController: DeleteChannelFromCategoryController;
  saveChannelController: SaveChannelController;
  getChannelsBySearchTermController: GetChannelsBySearchTermController;
  getCategoriesController: GetCategoriesController;
  getChannelsByCategoryController: GetChannelsByCategoryController;
  getCategoriesByChannelController: GetCategoriesByChannelController;
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
      .post('/', authenticateToken, (req, res) => {
        controllers.saveChannelController.handle(req, res);
      })
      .get('/', (req, res) => {
        controllers.getChannelsBySearchTermController.handle(req, res);
      });

    app
      .get('/category', (req, res) => {
        controllers.getCategoriesController.handle(req, res);
      })
      .post('/category', (req, res) => {
        controllers.saveCategoryController.handle(req, res);
      })
      .put('/category', (req, res) => {
        controllers.updateCategoryController.handle(req, res);
      });

    app.put('/category/channel', (req, res) => {
      controllers.deleteChannelFromCategoryController.handle(req, res);
    });

    // need admin verification
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

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
