import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { GetChannel } from '../../application/use-cases/GetChannel';

export class GetChannelController implements IController {
  public constructor(private readonly _useCase: GetChannel) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const channelName = req.query.channelName;

    if (!channelName || typeof channelName !== 'string') {
      res.status(400).json({ error: 'Invalid slug' });
      return;
    }

    const result = await this._useCase.execute({
      channelName,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).json(result);
  }
}
