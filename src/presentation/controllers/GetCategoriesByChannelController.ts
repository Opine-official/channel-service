import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { GetCategoriesByChannel } from '../../application/use-cases/GetCategoriesByChannel';

export class GetCategoriesByChannelController implements IController {
  public constructor(private readonly _useCase: GetCategoriesByChannel) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const channelId = req.query.channelId;

    if (!channelId || typeof channelId !== 'string') {
      res.status(400).json({ error: 'Invalid channelId' });
      return;
    }

    const result = await this._useCase.execute({ channelId });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).json(result);
  }
}
