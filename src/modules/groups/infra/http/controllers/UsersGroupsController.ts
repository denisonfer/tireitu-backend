import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowUsersOfGroupService from '@modules/groups/services/ShowUsersOfGroupService';
import JoinGroupUsingInviteService from '@modules/groups/services/JoinGroupUsingInviteService';
import ShowGroupsOfUserService from '@modules/groups/services/ShowGroupsOfUserService';
import ExitGroupService from '@modules/groups/services/ExitGroupService';

class UsersGroupsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;

    const showGroups = container.resolve(ShowGroupsOfUserService);

    const groups = await showGroups.execute({
      id_user,
    });

    return res.json(groups);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id_group } = req.params;

    const showUsersOfGroup = container.resolve(ShowUsersOfGroupService);

    const participants = await showUsersOfGroup.execute({
      id_group,
    });

    return res.json(participants);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { invite_key } = req.body;
    const id_user = req.user.id;

    const joinUserToGroup = container.resolve(JoinGroupUsingInviteService);

    const addParticipant = await joinUserToGroup.execute({
      id_user,
      invite_key,
    });

    return res.json(addParticipant);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id_user = req.user.id;
    const { id_group } = req.params;

    const exitGroup = container.resolve(ExitGroupService);

    await exitGroup.execute({
      id_group,
      id_user,
    });

    return res.status(200).send();
  }
}

export default UsersGroupsController;
