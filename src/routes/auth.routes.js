import {Router} from  'express';

import * as auth from '../controller/auth.controller.js';
import * as validate from '../core/validations/auth.validation.js';

const routes = new Router();

routes.post('/register', validate.registerAndLogin, auth.register);

export {routres as authRoutes};