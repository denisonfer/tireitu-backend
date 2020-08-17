import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EditUserProfileService from '@modules/users/services/EditUserProfileService';

class ProfileController {
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

    return res.json(user);
  }
}

export default ProfileController;
