import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticatedUser from '@modules/users/infra/http/middlewares/ensureAuthenticatedUser';
import RaffleGroupController from '../controllers/RaffleGroupController';

const raffleGroupRoutes = Router();

const raffleGroupController = new RaffleGroupController();

raffleGroupRoutes.post(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  raffleGroupController.create,
);

export default raffleGroupRoutes;
