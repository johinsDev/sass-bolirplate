import { Router } from 'express';
import * as AuthController from './auth.controller';
import { authenticate } from './auth.services';
import Mail from '../../services/mail';
import path from 'path';
const routes = Router();
import { MAIL } from '../../constants';

routes.post(
  '/signin',
  AuthController.login
);

routes.get(
  '/me',
  authenticate,
  AuthController.me
);

routes.get(
  '/mail',
  function(req, res) {
    Mail.send('test', { test: 'test' }, (message) => {
      message
        .from('Johan', 'johinsdev@gmail.com')
        .to('alejaiza14@gmail.com')
        .subject('test');
    })
    const Email = require('email-templates');
    const nodemailer = require('nodemailer');
    
    const transport =  nodemailer.createTransport({
      host: MAIL.host,
      port: MAIL.port,
      secure: false,
      auth: {
          user: MAIL.username,
          pass: MAIL.password
      }
    });
    
const email = new Email({
  message: {
    from: 'niftylettuce@gmail.com'
  },
  // uncomment below to send emails in development/test env:
  // send: true
  transport: {
    jsonTransport: true
  }
});

email
  .send({
    template: path.join(__dirname, 'emails', 'mars'),
    message: {
      to: 'elon@spacex.com'
    },
    locals: {
      name: req.protocol + '://' + req.get('host'),
      url: req.protocol + '://' + req.get('host') + req.originalUrl
    }
  })
  .then(({  originalMessage }) => {
    transport.sendMail(originalMessage, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
  })
  .catch(console.error);
    res.json('ok');
  }
);

export default routes;
