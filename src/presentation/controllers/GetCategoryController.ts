import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { GetCategory } from '../../application/use-cases/GetCategory';

export class GetCategoryController implements IController {
  public constructor(private readonly _useCase: GetCategory) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const categoryId = req.query.categoryId;

    if (!categoryId || typeof categoryId !== 'string') {
      res.status(400).json({ error: 'Invalid slug' });
      return;
    }

    const result = await this._useCase.execute({
      categoryId,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).json(result);
  }
}
