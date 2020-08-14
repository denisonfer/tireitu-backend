import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';

class AvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file;
    const userId = req.user.id;

    const updateAvatar = container.resolve(UpdateAvatarUserService);

    const user = await updateAvatar.execute({
      userId,
      filename,
    });

    return res.json(user);
  }
}

export default AvatarController;
