import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RaffleGroupService from '@modules/groups/services/RaffleGroupService';

class RaffleGroupController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id_group } = req.params;

    const raffleGroup = container.resolve(RaffleGroupService);

    await raffleGroup.execute({
      id_group,
    });

    return res.status(200).send();
  }
}

export default RaffleGroupController;
