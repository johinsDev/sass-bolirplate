import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import HTTPStatus from 'http-status';

import User from './user.model';
import { JWT_SECRET } from '../../config/app';

/**
 * Local Strategy Auth
 */
const localOpts = { usernameField: 'email' };

const localLogin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ $or: [{ email }, { username: email }]});

      if (!user) {
        return done(null, false, { message: 'This email or username is not registered.' });
      } else if (!(await user.authenticateUser(password))) {
        return done(null, false, { message: 'Password not valid.' });
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

/**
 * JWT Strategy Auth
 */

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);

export const authenticate = (req, res, next) => {

  passport.authenticate('jwt', (err, user, _) => {
      
      if (err) return next(err);
      if (!user) return res.status(HTTPStatus.UNAUTHORIZED).json({
        error: 'Unauthorized'
      })

      req.user = user;

      next();
  })(req, res, next);
}

export default passport;
