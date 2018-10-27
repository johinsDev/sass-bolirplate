import passport from 'passport';
import HTTPStatus from 'http-status';
import APIError from '../../services/error';


export async function login(req, res, next) {
  passport.authenticate('local', { session: true }, function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      return next(new APIError(info.message, HTTPStatus.UNAUTHORIZED, true));
    }

    res.status(HTTPStatus.OK).json(user.toAuthJSON());
  })(req, res, next)
}

export async function me(req, res, _) {
  res.json(req.user)
}
