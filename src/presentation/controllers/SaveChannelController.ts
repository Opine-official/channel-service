import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { SaveChannel } from '../../application/use-cases/SaveChannel';

export class SaveChannelController implements IController {
  public constructor(private readonly _useCase: SaveChannel) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      name: req.body.name,
      description: req.body.description,
      categories: req.body.categories,
      similar: req.body.similar,
      followerCount: req.body.followerCount,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Channel saved successfully',
      channelId: result.channelId,
    });
  }
}
