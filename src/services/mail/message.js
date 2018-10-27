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
  }
}

export default MessageBuilder;