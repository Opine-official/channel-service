import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { UpdateCategory } from '../../application/use-cases/UpdateCategory';

export class UpdateCategoryController implements IController {
  public constructor(private readonly _useCase: UpdateCategory) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      categoryId: req.body.categoryId,
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
      message: 'Category updated successfully',
      categoryId: result.categoryId,
    });
  }
}
