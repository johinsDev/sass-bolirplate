export const isDev = process.env.NODE_ENV === 'development';

export const DB_URL = process.env.DB_URL;

export const RAVEN_ID = process.env.RAVEN_ID;

export const JWT_SECRET = process.env.JWT_SECRET || 'test';

export const MAIL = {
  host: process.env.MAIL_HOST || 'smtp.ethereal',
  port: process.env.MAIL_PORT || 587,
  username: process.env.MAIL_USER,
  password: process.env.MAIL_PASS
}