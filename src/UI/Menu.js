import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';

 
export default class Menu extends UI{
  constructor(pos,name){
    super(pos); 
    /*基本情報*/
    this.type = "WICON";
    this.tex;
    switch(name){
      case "1" : this.tex = Art.UIPattern.wIcon.w1[0] ; break;
      case "2" : this.tex = Art.UIPattern.wIcon.w2[0] ; break;
      case "3" : this.tex = Art.UIPattern.wIcon.w3[0] ; break;
    }
    this.name = name;
    this.index = 0;
    /*スプライト*/
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = this.pos;
  }
  Update(){
    this.pos.x++; 
    this.sprite.position = this.pos;
  }
}
