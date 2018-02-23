import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';

 
export default class Menu extends UI{
  constructor(pos){
    super(pos); 
    /*基本情報*/
    this.type = "MENU";
    this.isMultiple = true;
    this.items = [
      "リスタート", 
      "ぶき",
      "やめる",
    ];
    /*スプライト*/
    this.sprites = [];
    let p = CPV(pos);
    for(let i = 0;i<items.length;i++){
      p.y += 16;
      this.sprites.push(new Font(p,items[i],"MENU"));
    }
  }
  Update(){
    if(Input.isKeyInput(KEY.DONW)){

    }
  }
}
