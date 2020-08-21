import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticatedUser from '@modules/users/infra/http/middlewares/ensureAuthenticatedUser';
import GroupController from '../controllers/GroupController';

const groupRoutes = Router();

const groupController = new GroupController();

groupRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      date_raffle: Joi.date().required(),
      date_party: Joi.date().required(),
      hour_party: Joi.date().required(),
      locale_party: Joi.string().required(),
      value_min: Joi.number().required(),
    },
  }),
  ensureAuthenticatedUser,
  groupController.create,
);

groupRoutes.put(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      date_raffle: Joi.date(),
      date_party: Joi.date(),
      hour_party: Joi.date(),
      locale_party: Joi.string(),
      value_min: Joi.number(),
    },
  }),
  ensureAuthenticatedUser,
  groupController.update,
);

groupRoutes.delete(
  '/:id_group',
  celebrate({
    [Segments.PARAMS]: {
      id_group: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  groupController.delete,
);

export default groupRoutes;
