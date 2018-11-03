import { Router } from 'express';
import * as ActivateController from './activate.controller';
import * as Request from './activate.request';

const routes = Router();

routes.post(
  '/resend',
  Request.resend,
  ActivateController.resend
);

routes.get(
  '/',
  Request.activate,
  ActivateController.activate
);

export default routes;
