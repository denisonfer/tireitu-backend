import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticatedUser from '../middlewares/ensureAuthenticatedUser';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.string().valid(Joi.ref('old_password')),
    },
  }),
  ensureAuthenticatedUser,
  profileController.update,
);

export default profileRoutes;
