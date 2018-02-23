import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';
import Font from './Font.js';

//HP outer
const HPF = {
  x : 24, 
  y : 160
};
//HP bar
const HPB = {
  x : HPF.x, 
  y : HPF.y, 
};
//HP font 
const HPFont = {
  x : HPF.x+22, 
  y : HPF.y+4, 
};
//HP Icon
const HPIC = {
  x : HPF.x-16, 
  y : HPF.y, 
};

export default class HP extends UI{
  constructor(pos,name){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "HP"; 

    this.outer;
    this.bar;
    this.icon;
    this.amount = new Font(HPFont,"100","HP");//数字

    /*スプライト*/
    switch (name){
      case "outer" : 
        this.spid = 0;
        break;
      case "bar" :
        this.spid = 1;
        break;
      case "icon" :
        this.spid = 2;
        break;
      default :
        console.warn("UI");
        break;
    }
    this.tex = Art.UIPattern.HP[this.spid];
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = this.pos;
    this.name = name;
    this.max = 100;//EntityManager.player.maxHP;
  }
  UpdateBar(hp){
    if(this.name == "bar"){
      /*debug*/
      if(!EntityManager.player){
        console.warn("player undefined");
      }else{
        this.sprite.scale.x = hp/this.max;
        //this.amount.UpdateFont(hp);
        UIManager.HP.font.UpdateFont(hp);
      }
    }
  }
  Update(){
  }
}
