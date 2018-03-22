import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Param from '../param.js';

const P_AMOUNT = {
  x : 22, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};

export default class gaugeHP extends UI{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "HP"; 
    this.isMultiple = true;
    this.pos = pos;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    let maxHP = Param.player.maxHp;
    this.amount = new Font(ADV(pos,P_AMOUNT),maxHP + "","HP");//数字
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //outer
    s = Art.SpriteFactory(Art.UIPattern.HP.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    //bar
    s = Art.SpriteFactory(Art.UIPattern.HP.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    //icon
    s = Art.SpriteFactory(Art.UIPattern.HP.icon);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
    /*パラメータ*/
    this.max = Param.player.maxHp;
    /*state*/
    this.isPopIn = true;
  }
  SetBar(hp){
    //barの長さを更新
    this.container.children[1].scale.x = hp/this.max;
    //HP数字の更新
    this.amount.SetFont(hp);
  }
  Update(){
    this.container.position.x = this.pos.x;
  }
}
