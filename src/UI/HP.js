import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';
import Font from './Font.js';

const P_AMOUNT = {
  x : 22, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};

export default class HP extends UI{
  constructor(pos,name){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "HP"; 
    this.isMultiple = true;
    this.name = name;
    this.pos = pos;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new Font(ADV(pos,P_AMOUNT),"100","HP");//数字

    //pos
    /*スプライト*/
    this.spid = 0;
    this.sprites = [];
    let s;
    //outer
    s = Art.SpriteFactory(Art.UIPattern.HP[this.spid]);
    s.position = this.outer.pos; 
    this.sprites.push(s);
    this.spid++;
    //bar
    s = Art.SpriteFactory(Art.UIPattern.HP[this.spid]);
    s.position = this.bar.pos; 
    this.sprites.push(s);
    this.spid++;
    //icon
    s = Art.SpriteFactory(Art.UIPattern.HP[this.spid]);
    s.position = this.icon.pos; 
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
