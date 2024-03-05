import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { GetCategories } from '../../application/use-cases/GetCategories';

export class GetCategoriesController implements IController {
  public constructor(private readonly _useCase: GetCategories) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute();

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Categories retrieved successfully',
      categories: result.categories,
    });
  }
}
