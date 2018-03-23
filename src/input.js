import Timer from './timer.js';

let inputedKeyList = (new Array(256)).fill(false);
let clickedKeyList = (new Array(256)).fill(false);
let anyKeyPress = false;
let timer = 0;

export default class Input{
  /*押下状態のときtrue*/
  static isKeyInput(key){
    return inputedKeyList[key];
  }
  /*押された瞬間のみture*/
  static isKeyClick(key){
    if(timer == Timer.timer){
      return clickedKeyList[key];
    }else{
      return false;
    }
  }
  static isAnyKeyClick(){
    return anyKeyPress;
  }
}
/*receive input event*/
$(document).on("keydown",(e)=> {
  anyKeyPress = true;
  clickedKeyList[event.keyCode] = false;
  if(!inputedKeyList[event.keyCode]){
    clickedKeyList[event.keyCode] = true;
    timer = Timer.timer;
  }
  inputedKeyList[event.keyCode] = true;
  //上下キーを封じる
  switch(e.keyCode){
    case KEY.UP: 
    case KEY.DOWN: 
    case KEY.RIGHT: 
    case KEY.LEFT: 
    case KEY.SP: event.preventDefault();
  }
});
$(document).on("keyup",(e)=> {
  anyKeyPress = false;
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});

