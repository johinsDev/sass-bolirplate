import nodemailer from 'nodemailer';
import path from 'path';
import MessageBuilder from './message';
import Email from 'email-templates';
import { host, port, username, password } from '../../config/mail';

const transport =  nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
      user: username,
      pass: password
  }
});

class Mailer {
  constructor(transport, view) {
    this.transport = transport;
    this.view = view;
  }

  async send(view, data, callback = null) {
    const message = this.buildMessge();

    callback(message);

    message.body(await this.parseView(view, data));

    try {
      const info = await this.transport.sendMail(message);

      console.log('Message sent: %s', info.messageId)
    } catch (error) {
      throw error;
    }
  }

  parseView(view, data) {
    return this.view.renderAll(path.join(global.__basedir + '/emails', view), data);
  }

  buildMessge() {
    return new MessageBuilder();
  }
}

export default new Mailer(transport, new Email());