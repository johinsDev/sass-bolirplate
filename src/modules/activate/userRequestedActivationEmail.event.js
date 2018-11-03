
import Mail from '../../services/mail';
import Event from '../../services/event';

class UserRequestedActivationEmail extends Event {
  constructor(user, req) {
    super();
    this.user = user;
    this.req = req;
  }

  listener() {
    if (this.user.active) {
      return;
    }

    const data = { 
      name: 'Johan', 
      url: `${this.req.protocol}://${this.req.get('host')}/api/v1/activate?email=${this.user.email}&token=${this.user.activationToken}`,
      config: () => process.env.APP_NAME
    };

    Mail.send('welcome', data, (message) => {
      message
        .from('Johan', 'johinsdev@gmail.com')
        .to(this.user.email)
        .subject('Activation Email');
    });
  }
}

export default UserRequestedActivationEmail;