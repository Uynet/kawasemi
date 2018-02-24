import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';
import Font from './Font.js';
import Game from '../Game.js';
import EventManager from '../Event/eventmanager.js';
import QuitGameEvent from '../Event/quakeEvent.js';

const COLUMN = 12;
const INDENT = {x:-8,y:0};
 
export default class Menu extends UI{
  constructor(pos){
    super(pos); 
    /*基本情報*/
    this.type = "MENU";
    this.isMultiple = true;
    let p = CPV(pos);
    this.title = new Font({x:p.x,y:p.y + -1 * COLUMN},"-PAUSE-","MENU"),
    this.index = 0;
    this.items = [
      new Font({x:p.x + 0,y:p.y + 1 * COLUMN},"さいかい","MENU"),
      new Font({x:p.x + 0,y:p.y + 2 * COLUMN},"ぶき","MENU"),
      new Font({x:p.x + 0,y:p.y + 3 * COLUMN},"やめる","MENU"),
    ];
    this.Select(this.index);
    /*スプライト*/
    this.sprites = [];
    for(let l of this.title.sprites){
      this.sprites.push(l);
    }
    for(let i = 0;i<this.items.length;i++){
      for(let l of this.items[i].sprites){
        this.sprites.push(l);
      }
    }
  }
  Select(i){
    for(let j=0;j<this.items.length;j++){
      let p = {
        x : this.pos.x, 
        y : this.pos.y + (j+1)*COLUMN,
      }
      if(j==i){
        this.items[j].Move(ADV(p,INDENT));
      }
      else {
        this.items[j].Move(p);
      }
    }
  }
  Update(){
    if(Input.isKeyClick(KEY.DOWN)||(Input.isKeyClick(KEY.RIGHT))){
      this.index = Math.min(this.index+1,this.items.length-1);
      this.Select(this.index);
    }
    if(Input.isKeyClick(KEY.UP) || Input.isKeyClick(KEY.LEFT)){
      this.index = Math.max(this.index-1,0);
      this.Select(this.index);
    }
    if(Input.isKeyClick(KEY.Z) || Input.isKeyClick(KEY.X)|| Input.isKeyClick(KEY.SP)){
      switch(this.items[this.index].str){
        case "さいかい" : break;
        case "ぶき" : break;
        case "やめる" :
          //let e  = new QuitGameEvent();
          //EventManager.eventList.push(e);
          break;
      }
    }
  }
}
