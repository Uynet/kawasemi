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
    this.isMultiple = true;
    this.name = name;
    /*child*/
    this.outer;
    this.bar;
    this.icon;
    this.amount = new Font(HPFont,"100","HP");//数字
    /*スプライト*/
    this.spid = 0;
    this.sprites = [];
    let s;
    //outer
    s = Art.SpriteFactory(Art.UIPattern.HP[this.spid]);
    s.position = HPF; 
    this.sprites.push(s);
    this.spid++;
    //bar
    s = Art.SpriteFactory(Art.UIPattern.HP[this.spid]);
    s.position = HPB; 
    this.sprites.push(s);
    this.spid++;
    //icon
    s = Art.SpriteFactory(Art.UIPattern.HP[this.spid]);
    s.position = HPIC; 
    this.sprites.push(s);
    //amount
    for(let l of this.amount.sprites){
      this.sprites.push(l);
    }
    /*パラメータ*/
    this.max = 100;//EntityManager.player.maxHP;
  }
  UpdateBar(hp){
    //barの長さを更新
    this.sprites[1].scale.x = hp/this.max;
    //HP数字の更新
    this.amount.UpdateFont(hp);
  }
  Update(){
  }
}
