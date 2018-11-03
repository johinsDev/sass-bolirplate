import * as Yup from 'yup';
import validator from '../../services/validation/Validator';

export async function activate(req, _, next) {;
  const activateSchema = Yup.object().shape({
    token: Yup.string().required().min(255),
    email: Yup.string()
    .required()
    .email()
    .max(255)
    .exists('User', 'email', 'Email not valid.')
  });

  try {
    await validator.validate(req.query, activateSchema); 
  } catch (error) {
    return next(error);
  }

  return next();
}

export async function resend(req, _, next) {;
  const resendSchema = Yup.object().shape({
    email: Yup.string()
    .required()
    .email()
    .max(255)
    .exists('User', 'email', 'Email not valid.')
  });

  try {
    await validator.validate(req.body, resendSchema); 
  } catch (error) {
    return next(error);
  }

  return next();
}
