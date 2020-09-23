import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticatedUser from '@modules/users/infra/http/middlewares/ensureAuthenticatedUser';
import UsersGroupsController from '../controllers/UsersGroupsController';

const usersGroupsRoutes = Router();

const usersGroupsController = new UsersGroupsController();

usersGroupsRoutes.get('/', ensureAuthenticatedUser, usersGroupsController.show);

usersGroupsRoutes.get(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  usersGroupsController.index,
);

usersGroupsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      invite_key: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  usersGroupsController.create,
);

usersGroupsRoutes.put(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  usersGroupsController.update,
);

export default usersGroupsRoutes;
