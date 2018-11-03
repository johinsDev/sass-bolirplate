import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import passport from '../modules/auth/auth.services';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';

import config from '../services/config';

export default app => {
  app.use(morgan(config.get('app.isDev') ? 'dev' : 'common'));
  app.use(express.json());
  app.use(compression());
  app.use(helmet());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors());
  app.use(methodOverride());
};