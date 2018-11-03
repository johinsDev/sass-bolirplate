class MessageBuilder {
  from(address, name) {
    this.from = {
      name,
      address
    }

    return this;  
  }

  to(addresses) {
    this.to = addresses.split(',');

    return this; 
  }

  subject(subject) {
    this.subject = subject;

    return this;
  }

  body(body) {
    this.subject = body.subject;
    this.text = body.text;
    this.html = body.html;
  }
}

export default MessageBuilder;