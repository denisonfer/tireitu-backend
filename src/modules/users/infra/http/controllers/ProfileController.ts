import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import EditUserProfileService from '@modules/users/services/EditUserProfileService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileUserService);

    const user = await showProfile.execute({
      user_id: req.user.id,
    });

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, old_password, new_password } = req.body;
    const id_user = req.user.id;

    const editProfileUser = container.resolve(EditUserProfileService);

    const user = await editProfileUser.execute({
      id_user,
      name,
      email,
      old_password,
      new_password,
    });

    return res.json(classToClass(user));
  }
}

export default ProfileController;
