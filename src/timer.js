export default class Timer {
  static Init() {
    this.timer = 0;
    this.timeScale = 1.0;
  }
  static GetTime() {
    return this.timer;
  }
  static IncTime() {
    this.timer++;
  }
  static GetTimeScale() {
    return this.timeScale;
  }
  static SetTimeScale(timeScale) {
    let unko = timeScale - this.timeScale;
    if (unko < 0) this.timeScale += unko * 0.12;
    else this.timeScale += unko * 0.3;
    //this.timeScale = timeScale;
    //let pitch = (1-(1-this.timeScale)/5);
    //Audio.SetPitch(pitch);
  }
}
