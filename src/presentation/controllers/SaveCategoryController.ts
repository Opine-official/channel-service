import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { SaveCategory } from '../../application/use-cases/SaveCategory';

export class SaveCategoryController implements IController {
  public constructor(private readonly _useCase: SaveCategory) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      name: req.body.name,
      description: req.body.description,
      channels: req.body.channels,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Category saved successfully',
      categoryId: result.categoryId,
    });
  }
}
