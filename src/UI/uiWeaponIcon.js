import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';

 
export default class UIWeaponIcon extends UI{

  constructor(name){
    let tex;
    switch(name){
      case "1" : tex = Art.UIPattern[3];break;
      case "2" : tex = Art.UIPattern[4];break;
      case "3" : tex = Art.UIPattern[5];break;
    }
    super(tex,UI_.WICON); 
    this.name = name;
    this.index = 0;
  }
  Update(){
       let to = WICON_X + 20*this.index;
       let dif = to - this.sprite.x;
       this.sprite.x += dif * 0.6;
  }
}
