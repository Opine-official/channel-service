import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { GetTopChannels } from '../../application/use-cases/GetTopChannels';

export class GetTopChannelsController implements IController {
  public constructor(private readonly _useCase: GetTopChannels) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({});
    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }
    res.status(200).send({
      channels: result.channels,
    });
  }
}
