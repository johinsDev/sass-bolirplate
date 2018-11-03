module.exports = {
  host: process.env.MAIL_HOST || 'smtp.ethereal',
  port: process.env.MAIL_PORT || 587,
  username: process.env.MAIL_USER,
  password: process.env.MAIL_PASS
}