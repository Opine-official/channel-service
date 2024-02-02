import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { DeleteCategory } from '../../application/use-cases/DeleteCategory';

export class DeleteCategoryController implements IController {
  public constructor(private readonly _useCase: DeleteCategory) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const categoryId = req.query.categoryId;

    if (!categoryId || typeof categoryId !== 'string') {
      res.status(400).json({ error: 'Invalid categoryId' });
      return;
    }

    const result = await this._useCase.execute({
      categoryId: categoryId,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Category deleted successfully',
      categoryId: result.categoryId,
    });
  }
}
