import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';
import Font from './Font.js';

const COLUMN = 10;
 
export default class Menu extends UI{
  constructor(pos){
    super(pos); 
    /*基本情報*/
    this.type = "MENU";
    this.isMultiple = true;
    let p = CPV(pos);
    this.items = [
      new Font({x:p.x,y:p.y + 0 * COLUMN},"リスタート","MENU"),
      new Font({x:p.x,y:p.y + 1 * COLUMN},"ぶき","MENU"),
      new Font({x:p.x,y:p.y + 2 * COLUMN},"やめる","MENU"),
    ];
    /*スプライト*/
    this.sprites = [];
    for(let i = 0;i<this.items.length;i++){
      for(let l of this.items[i].sprites){
        this.sprites.push(l);
      }
    }
  }
  Update(){
    if(Input.isKeyInput(KEY.DONW)){

    }
  }
}
