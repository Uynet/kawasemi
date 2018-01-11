export default class Timer{
  static GetTime(){
    return this.timer;
  }
  static Init(){
    this.timer = 0;
  }
  static IncTime(){
    this.timer++;
  }
}
