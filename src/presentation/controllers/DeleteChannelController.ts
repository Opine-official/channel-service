import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { DeleteChannel } from '../../application/use-cases/DeleteChannel';

export class DeleteChannelController implements IController {
  public constructor(private readonly _useCase: DeleteChannel) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const channelId = req.query.channelId;

    if (!channelId || typeof channelId !== 'string') {
      res.status(400).json({ error: 'Invalid channelId' });
      return;
    }

    const result = await this._useCase.execute({
      channelId: channelId,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Channel deleted successfully',
      channelId: result.channelId,
    });
  }
}
