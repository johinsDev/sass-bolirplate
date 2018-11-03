/**
 * Error handler for api routes
 */

import Raven from 'raven';
import PrettyError from 'pretty-error';
import HTTPStatus from 'http-status';

import config from '../services/config';
import APIError, { RequiredError } from './error';

// eslint-disable-next-line no-unused-vars
export default function logErrorService(err, _, res, next) {
  if (!err) {
    return new APIError(
      'Error with the server!',
      HTTPStatus.INTERNAL_SERVER_ERROR,
      true,
    );
  }

  if (config.get('app.isProd')) {
    const raven = new Raven.Client(config.get('app.RAVEN_ID'));
    raven.captureException(err);
  }

  if (config.get('app.siDev')) {
    const pe = new PrettyError();
    pe.skipNodeFiles();false
    pe.skipPackage('express');

    // eslint-disable-next-line no-console
    console.log(pe.render(err));
  }

  const error = {
    message: err.message || 'Internal Server Error.',
  };

  if (err.errors) {
    error.errors = RequiredError.makePretty(err);
  }

  res.status(err.status || HTTPStatus.UNPROCESSABLE_ENTITY).json(error);

  return next();
}