import HTTPStatus from 'http-status';
import APIError from '../../services/error';
import User from '../auth/user.model';
import UserRequestedActivationEmail from './userRequestedActivationEmail.event';

export async function activate(req, res, next) {
  try {

    const { email, token } = req.query;

    const user = await User.findOneAndUpdate(
      { email, activationToken: token }, 
      { $set: { active: true, activationToken: null } }, 
      { new: true }
    );

    if (!user) {
      return next(new APIError('User not found', HTTPStatus.NOT_FOUND, true));
    }

    return res.json(user.toAuthJSON())
  } catch (error) {
    return next(error);
  }
}

export async function resend(req, res, next) {
  try {
    const { email } = req.body;

    const user = await User.byEmail(email);

    const event = new UserRequestedActivationEmail(user, req);

    event.handle();

    res.json({
      message: 'Account activation token has been resent.'
    })
  } catch (error) {
    return next(error);
  }
}
