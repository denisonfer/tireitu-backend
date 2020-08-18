import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

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

    return res.json(classToClass(user));
  }
}

export default AvatarController;
