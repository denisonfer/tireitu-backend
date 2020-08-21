import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateInviteService from '@modules/groups/services/CreateInviteService';

class InviteController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name_invited, email_invited } = req.body;
    const { id_group } = req.params;

    const createInvite = container.resolve(CreateInviteService);

    const invite = await createInvite.execute({
      id_group,
      name_invited,
      email_invited,
    });

    return res.json(invite);
  }
}

export default InviteController;
