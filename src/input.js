import Timer from "./timer.js";
import Game from "./game.js";

let inputedKeyList = new Array(256).fill(false);
let clickedKeyList = new Array(256).fill(false);
let anyKeyPress = false;
let timer = 0;

export default class Input {
  /*押下状態のときtrue*/
  static isKeyInput(key) {
    return inputedKeyList[key];
  }
  /*押された瞬間のみture*/
  static isKeyClick(key) {
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
  //スクロール禁止用関数
  static noScroll() {
    //PC用
    const scroll_event =
      "onwheel" in document
        ? "wheel"
        : "onmousewheel" in document
        ? "mousewheel"
        : "DOMMouseScroll";
    $(document).on(scroll_event, e => {
      e.preventDefault();
    });
    //SP用
    $(document).on("touchmove.noScroll", e => {
      e.preventDefault();
    });
  }
  //スクロール復活用関数
  static returnScroll() {
    //PC用
    const scroll_event =
      "onwheel" in document
        ? "wheel"
        : "onmousewheel" in document
        ? "mousewheel"
        : "DOMMouseScroll";
    $(document).off(scroll_event);
    //SP用
    $(document).off(".noScroll");
  }
  static addKeyListenner(entity, keyCode, handler) {
    if (Game.state)
      Game.state.getState().addKeyListenner(entity, keyCode, handler);
  }
}
/*receive input event*/
$(document).on("keydown", e => {
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
$(document).on("keyup", e => {
  anyKeyPress = false;
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});
