import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGroupService from '@modules/groups/services/CreateGroupService';
import EditGroupService from '@modules/groups/services/EditGroupService';
import DeleteGroupService from '@modules/groups/services/DeleteGroupService';
import ShowGroupsOfUserService from '@modules/groups/services/ShowGroupsOfUserService';

class GroupController {
  public async show(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;

    const showGroups = container.resolve(ShowGroupsOfUserService);

    const groups = await showGroups.execute({
      id_user,
    });

    return res.json(groups);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const user_admin = req.user.id;
    const {
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    } = req.body;

    const createGroup = container.resolve(CreateGroupService);

    const group = await createGroup.execute({
      name,
      user_admin,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    });

    return res.json(group);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_admin = req.user.id;
    const { id_group } = req.params;
    const {
      name,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    } = req.body;

    const editGroup = container.resolve(EditGroupService);

    const group = await editGroup.execute({
      id_group,
      name,
      user_admin,
      date_raffle,
      date_party,
      hour_party,
      locale_party,
      value_min,
    });

    return res.json(group);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id_group } = req.params;

    const removeGroup = container.resolve(DeleteGroupService);

    await removeGroup.execute({
      id_group,
    });

    return res.status(204).send();
  }
}

export default GroupController;
