export default class EventManager{
  static Init(){
    this.eventList = [];
  }
  static PushEvent(event){
    this.eventList.push(event);
  }
}
