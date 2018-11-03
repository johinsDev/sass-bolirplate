module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  RAVEN_ID: process.env.RAVEN_ID,
  JWT_SECRET: process.env.JWT_SECRET || 'test'
}