import { Router } from 'express';
import * as AuthController from './auth.controller';
import { RequestLogin, RequestRegister } from './auth.request';

const routes = Router();

routes.post(
  '/signin',
  RequestLogin,
  AuthController.login
);

routes.post(
  '/signup',
  RequestRegister,
  AuthController.register
);

export default routes;
