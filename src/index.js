import express from 'express';
import "dotenv/config";

import './config/db';
import routes from './routes';
import middlewaresConfig from './config/middlewares';

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