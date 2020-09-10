import Timer from "./timer.js";
import Game from "./game.js";

let inputedKeyList = new Array(256).fill(false);
let clickedKeyList = new Array(256).fill(false);
let anyKeyDown = false;
let anyKeyClick= false;
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
  //UIの長押しの際などに必要となる挙動
  static isKeyPress(key) {
    const t = Timer.timer - timer;
    return (
      //Click後にインターバルをおいた後、一定の間隔で押下判定
      Input.isKeyClick(key) || (t > 12 && t % 5 == 0 && Input.isKeyInput(key))
    );
  }
  static VirtualKeyDown(key) {
    inputedKeyList[key] = true;
  }
  static VirtualKeyUp(key) {
    inputedKeyList[key] = false;
  }
  static isAnyKeyPress() {
    const t = Timer.timer - timer;
    return (
      //Click後にインターバルをおいた後、一定の間隔で押下判定
      Input.isAnyKeyClick() || (t > 12 && t % 5 == 0 && anyKeyDown)
    );
  }
  static isAnyKeyClick() {
    //console.log(timer + "/" + Timer.timer)
    return timer==Timer.timer && anyKeyClick;
  }
  static addKeyListenner(entity, keyCode, handler) {
    if (Game.state)
      Game.state.getState().addKeyListenner(entity, keyCode, handler);
  }
  static getPressedKeys(){
    let a = inputedKeyList.map((e,i)=>{ 
      if(e) return i;
      return e;
    });
    let b  = a.filter(e=>
      {return e!=false}
    );
    return b; 
  }
  static getClickedKeys(){
    let a = clickedKeyList.map((e,i)=>{ 
      if(e) return i;
      return e;
    });
    let b  = a.filter(e=>
      {return e!=false}
    );
    return b; 
  }
}
/*receive input event*/
document.onkeydown =  (e => {
  anyKeyDown = true;
  anyKeyClick = false;
  clickedKeyList[event.keyCode] = false;
  if (!inputedKeyList[event.keyCode]) {
    clickedKeyList[event.keyCode] = true;
    anyKeyClick = true;
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
  anyKeyDown = false;
  anyKeyClick = false;
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});
