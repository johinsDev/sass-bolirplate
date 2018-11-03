import express from 'express';
import path from 'path';
import "dotenv/config";
import './services/db';

import routes from './routes';
import config from './services/config';
import middlewaresConfig from './services/middlewares';

global.__basedir = path.resolve(__dirname);
config.init(global.__basedir);

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
  res.send('Working');
});

app.use('/api/v1', routes);

app.listen(process.env.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server listen on port ${ process.env.PORT }`);
  }
});