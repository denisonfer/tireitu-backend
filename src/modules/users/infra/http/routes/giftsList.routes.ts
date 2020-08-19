import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ensureAuthenticatedUser from '../middlewares/ensureAuthenticatedUser';
import GiftsListController from '../controllers/GiftsListController';

const giftsListRoutes = Router();
const giftsListController = new GiftsListController();

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

export default giftsListRoutes;
