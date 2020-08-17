import { Router } from 'express';

import userRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/session.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/profiles', profileRoutes);
routes.use('/password', passwordRoutes);

export default routes;
