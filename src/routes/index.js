import {Router} from 'express';

import {authRoutes} from './auth.routes.js';
import {userRoutes} from './user.routes.js';

const routes = new Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);

export {routes};