import Timer from './timer.js';

let inputedKeyList = (new Array(256)).fill(false);
let clickedKeyList = (new Array(256)).fill(false);
let unko = 0;

export default class Input{
  /*押下状態のときtrue*/
  static isKeyInput(key){
    return inputedKeyList[key];
  }
  /*押された瞬間のみture*/
  static isKeyClick(key){
    if(unko == Timer.timer){
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
    unko = Timer.timer;
  }
  inputedKeyList[event.keyCode] = true;
  if(e.keyCode==KEY.UP || e.keyCode == KEY.DOWN) event.preventDefault();
});
$(document).on("keyup",(e)=> {
  clickedKeyList[event.keyCode] = false;
  inputedKeyList[event.keyCode] = false;
});

