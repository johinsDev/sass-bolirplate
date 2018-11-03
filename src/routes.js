/**
 * API Routes
 */

import { Router } from 'express';
import HTTPStatus from 'http-status';

import { 
  AuthRoutes,
  ActivateRoutes
} from './modules';
import APIError from './services/error';
import logErrorService from './services/log';


const routes = new Router();

routes.use('/auth', AuthRoutes);
routes.use('/activate', ActivateRoutes);

routes.all('*', (_, __, next) =>
  next(new APIError('Route Not Found!', HTTPStatus.NOT_FOUND, true)),
);

routes.use(logErrorService);

export default routes;