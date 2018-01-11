import Timer from './Timer.js';

let inputedKeyList = (new Array(256)).fill(false);
let clickedKeyList = (new Array(256)).fill(false);
let po = 0;

export default class Input{
  /*押下状態のときtrue*/
  static isKeyInput(key){
    return inputedKeyList[key];
  }
  /*押された瞬間のみture*/
  static isKeyClick(key){
    if(po == Timer.timer){
      return clickedKeyList[key];
    }else{
      return false;
    }
  }
}
/*receive input event*/
$(document).on("keydown",(e)=> {
  clickedKeyList[event.keyCode] = false;
  if(!inputedKeyList[event.keyCode]){
    clickedKeyList[event.keyCode] = true;
    po = Timer.timer;
  }
  inputedKeyList[event.keyCode] = true;
  event.preventDefault();
});
$(document).on("keyup",(e)=> {
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});

