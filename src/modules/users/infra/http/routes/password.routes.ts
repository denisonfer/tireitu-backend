import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';

import PasswordController from '../controllers/PasswordController';

const passwordRoutes = Router();

const passwordController = new PasswordController();

passwordRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordController.create,
);

passwordRoutes.put(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
    },
  }),
  passwordController.update,
);

export default passwordRoutes;
