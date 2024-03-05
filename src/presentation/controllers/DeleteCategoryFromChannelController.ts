import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { DeleteCategoryFromChannel } from '../../application/use-cases/DeleteCategoryFromChannel';

export class DeleteCategoryFromChannelController implements IController {
  public constructor(private readonly _useCase: DeleteCategoryFromChannel) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      categoryId: req.body.categoryId,
      channelId: req.body.channelId,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Category deleted from channel successfully',
      categoryId: result.categoryId,
      channelId: result.channelId,
    });
  }
}
