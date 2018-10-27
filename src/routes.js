/**
 * API Routes
 */

import { Router } from 'express';
import HTTPStatus from 'http-status';

import { AuthRoutes } from './modules';
import APIError from './services/error';

const routes = new Router();

routes.use('/auth', AuthRoutes);

routes.all('*', (_, __, next) =>
  next(new APIError('Route Not Found!', HTTPStatus.NOT_FOUND, true)),
);

export default routes;