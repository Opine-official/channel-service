import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { GetCategoriesBySearchTerm } from '../../application/use-cases/GetCategoriesBySearchTerm';

export class GetCategoriesBySearchTermController implements IController {
  public constructor(private readonly _useCase: GetCategoriesBySearchTerm) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm || typeof searchTerm !== 'string') {
      res.status(400).json({ error: 'Invalid searchTerm' });
      return;
    }

    const result = await this._useCase.execute({
      searchTerm: searchTerm,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      categories: result.categories,
    });
  }
}
