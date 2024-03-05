import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { DeleteChannelSubscribe } from '../../application/use-cases/DeleteChannelSubscribe';

export class DeleteChannelSubscribeController implements IController {
  public constructor(private readonly _useCase: DeleteChannelSubscribe) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const userId = req.query.userId?.toString();
    const channelId = req.query.channelId?.toString();

    if (!userId || !channelId) {
      res.status(400).json({ error: 'userId and channelId are required' });
      return;
    }

    const result = await this._useCase.execute({
      userId,
      channelId,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Channel unsubscribed successfully',
    });
  }
}
