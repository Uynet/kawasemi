import Timer from "./timer.js";
import Game from "./game.js";

let inputedKeyList = new Array(256).fill(false);
let clickedKeyList = new Array(256).fill(false);
let anyKeyPress = false;
let timer = 0;

export default class Input {
  //入力を禁止する
  static lock() {
    this.isLocked = true;
  }
  //入力禁止を解除
  static restore() {
    this.isLocked = false;
  }
  /*押下状態のときtrue*/
  static isKeyInput(key) {
    if (this.isLocked) return false;
    return inputedKeyList[key];
  }
  /*押された瞬間のみture*/
  static isKeyClick(key) {
    if (this.isLocked) return false;
    if (timer == Timer.timer) {
      return clickedKeyList[key];
    } else {
      return false;
    }
  }
  //押してからちょっと時間がたつとtrue
  static isKeyPress(key) {
    const t = Timer.timer - timer;
    return (
      //200ミリ秒がいいらしい
      Input.isKeyClick(key) || (t > 12 && t % 5 == 0 && Input.isKeyInput(key))
    );
  }
  static VirtualKeyDown(key) {
    inputedKeyList[key] = true;
  }
  static VirtualKeyUp(key) {
    inputedKeyList[key] = false;
  }
  static isAnyKeyClick() {
    return anyKeyPress;
  }
  static addKeyListenner(entity, keyCode, handler) {
    if (Game.state)
      Game.state.getState().addKeyListenner(entity, keyCode, handler);
  }
}
/*receive input event*/
document.onkeydown =  (e => {
  anyKeyPress = true;
  clickedKeyList[event.keyCode] = false;
  if (!inputedKeyList[event.keyCode]) {
    clickedKeyList[event.keyCode] = true;
    timer = Timer.timer;
  }
  inputedKeyList[event.keyCode] = true;
  //上下キーを封じる
  switch (e.keyCode) {
    case KEY.UP:
    case KEY.DOWN:
    case KEY.RIGHT:
    case KEY.LEFT:
    case KEY.SP:
      event.preventDefault();
  }
});
document.onkeyup = (e => {
  anyKeyPress = false;
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});
