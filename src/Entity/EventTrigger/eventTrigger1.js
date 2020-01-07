import EventTrigger from "./eventTrigger.js";

export default class EventTrigger1 extends EventTrigger {
  constructor(pos) {
    super(pos);
    this.name = "eventTrigger1";
  }
  OnCollision(collisionInfo, player) {
    // Event
  }
}
