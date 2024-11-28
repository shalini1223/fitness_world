import {Router} from  'express';

import { verifyPurchaseToken, saveGoogleSubDetails, saveAppleSubDetails } from '../controller/subscription.controller.js';

const routes = new Router();

routes.post('/verify-token', authorizeUser,verifyPurchaseToken);
routes.post('/webhook/google-play', saveGoogleSubDetails);
routes.post('/webhook/app-store', saveAppleSubDetails);

export {routes as subscriptionRoutes};