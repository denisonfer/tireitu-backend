import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import AvatarController from '../controllers/AvatarController';
import ensureAuthenticatedUser from '../middlewares/ensureAuthenticatedUser';

const userRoutes = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const avatarController = new AvatarController();

userRoutes.post('/', usersController.create);
userRoutes.patch(
  '/avatar',
  ensureAuthenticatedUser,
  upload.single('avatar'),
  avatarController.update,
);

export default userRoutes;
