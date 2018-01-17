export default class Timer{
  static Init(){
    this.timer = 0;
  }
  static GetTime(){
    return this.timer;
  }
  static IncTime(){
    this.timer++;
  }
}
