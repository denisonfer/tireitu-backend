import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGiftsListService from '@modules/users/services/CreateGiftsListService';

class GiftsListController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { gift_1, gift_2, gift_3 } = req.body;
    const id_user = req.user.id;

    const createGiftsList = container.resolve(CreateGiftsListService);

    const gifts = await createGiftsList.execute({
      id_user,
      gift_1,
      gift_2,
      gift_3,
    });

    return res.json(gifts);
  }
}

export default GiftsListController;
