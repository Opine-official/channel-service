import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { GetChannels } from '../../application/use-cases/GetChannels';

export class GetChannelsController implements IController {
  public constructor(private readonly _useCase: GetChannels) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute();

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Channels retrieved successfully',
      channels: result.channels,
    });
  }
}
