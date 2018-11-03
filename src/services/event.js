import Event from 'events';

class EventService extends Event {
  constructor() {
    super();
    this.eventName = this.constructor.name;
    this.on(this.eventName, this.listener)
  }

  handle() {
    this.emit(this.eventName)
  }
}

export default EventService;