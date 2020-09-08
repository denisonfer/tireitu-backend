import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGiftsListService from '@modules/users/services/CreateGiftsListService';
import ShowGiftUserService from '@modules/users/services/ShowGiftUserService';
import EditGiftsUserService from '@modules/users/services/EditGiftsUserService';

class GiftsListController {
  public async index(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;

    const showGiftsUser = container.resolve(ShowGiftUserService);

    const giftsUser = await showGiftsUser.execute(id_user);

    return res.json(giftsUser);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id_user } = req.params;

    const showGiftsPerUser = container.resolve(ShowGiftUserService);

    const gifts = await showGiftsPerUser.execute(id_user);

    return res.json(gifts);
  }

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

  public async update(req: Request, res: Response): Promise<Response> {
    const { gift_1, gift_2, gift_3 } = req.body;
    const { id_gift } = req.params;
    const id_user = req.user.id;

    const editGiftsUser = container.resolve(EditGiftsUserService);

    const giftsEdited = await editGiftsUser.execute({
      id_user,
      id_gift,
      gift_1,
      gift_2,
      gift_3,
    });

    return res.json(giftsEdited);
  }
}

export default GiftsListController;
