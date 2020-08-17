import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticatedUser from '../middlewares/ensureAuthenticatedUser';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.put('/', ensureAuthenticatedUser, profileController.update);

export default profileRoutes;
