import QuakeEvent from "./quakeEvent.js";

export default class EventManager{
  static Init(){
    this.eventList = [];
  }
  static PushEvent(event){
    this.eventList.push(event);
  }
  static Quake(size,time){
    this.PushEvent(new QuakeEvent(size,time));
  }
}
