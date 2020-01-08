import QuakeEvent from "./quakeEvent.js";

export default class EventManager {
  static Init() {
    this.eventList = [];
  }
  static Update() {
    for (let event of EventManager.eventList) {
      if (event.Do().done) {
        EventManager.Remove(event);
      }
    }
  }
  static Add(event) {
    this.eventList.push(event);
  }
  static Quake(size, time, isRot) {
    this.Add(new QuakeEvent(size, time, isRot));
  }
  static Remove(event) {
    this.eventList.remove(event);
  }
}
