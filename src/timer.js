export default class Timer{
  static Init(){
    this.timer = 0;
    this.timeScale = 1.0;
  }
  static GetTime(){
    return this.timer;
  }
  static IncTime(){
    this.timer++;
  }
}
