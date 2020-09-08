import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticatedUser from '../middlewares/ensureAuthenticatedUser';
import GiftsListController from '../controllers/GiftsListController';

const giftsListRoutes = Router();
const giftsListController = new GiftsListController();

giftsListRoutes.get('/', ensureAuthenticatedUser, giftsListController.index);

giftsListRoutes.get(
  '/:id_user',
  celebrate({
    [Segments.PARAMS]: {
      id_user: Joi.string().required(),
    },
  }),
  ensureAuthenticatedUser,
  giftsListController.show,
);

giftsListRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      gift_1: Joi.string(),
      gift_2: Joi.string(),
      gift_3: Joi.string(),
    },
  }),
  ensureAuthenticatedUser,
  giftsListController.create,
);

giftsListRoutes.put(
  '/:id_gift',
  celebrate({
    [Segments.PARAMS]: {
      id_gift: Joi.string().required(),
    },
    [Segments.BODY]: {
      gift_1: Joi.string(),
      gift_2: Joi.string(),
      gift_3: Joi.string(),
    },
  }),
  ensureAuthenticatedUser,
  giftsListController.update,
);

export default giftsListRoutes;
