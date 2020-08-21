import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticatedUser from '@modules/users/infra/http/middlewares/ensureAuthenticatedUser';
import InviteController from '../controllers/InviteController';

const inviteRoutes = Router();

const inviteController = new InviteController();

inviteRoutes.post(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
    [Segments.BODY]: {
      name_invited: Joi.string().required(),
      email_invited: Joi.string().email().required(),
    },
  }),
  ensureAuthenticatedUser,
  inviteController.create,
);

export default inviteRoutes;
