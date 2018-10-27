import nodemailer from 'nodemailer';
import { MAIL } from '../../constants';
import MessageBuilder from './message';

const transport =  nodemailer.createTransport({
  host: MAIL.host,
  port: MAIL.port,
  secure: false,
  auth: {
      user: MAIL.username,
      pass: MAIL.password
  }
});

class Mailer {
  constructor(transport) {
    this.transport = transport;
  }

  send(view, data, callback = null) {
    const message = this.buildMessge();

    callback(message);
  }

  buildMessge() {
    return new MessageBuilder();
  }
}

export default new Mailer(transport);