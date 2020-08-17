import { Router } from 'express';

import PasswordController from '../controllers/PasswordController';

const passwordRoutes = Router();

const passwordController = new PasswordController();

passwordRoutes.post('/', passwordController.create);
passwordRoutes.put('/reset', passwordController.update);

export default passwordRoutes;
