import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { UpdateChannel } from '../../application/use-cases/UpdateChannel';

export class UpdateChannelController implements IController {
  public constructor(private readonly _useCase: UpdateChannel) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      channelId: req.body.channelId,
      name: req.body.name,
      description: req.body.description,
      categories: req.body.categories,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Channel updated successfully',
      channelId: result.channelId,
    });
  }
}
