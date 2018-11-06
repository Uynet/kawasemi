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
const P_BAR = {
  x : -3.5, 
  y : 1, 
};

export default class gaugeHP extends UI{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "HP"; 
    this.isMultiple = true;
    this.pos = pos;
    /*パラメータ*/
    this.max = Param.player.maxHp;
    this.color = 0xBB2E5D;
    /*child*/
    this.outer = {pos:copy(pos)};
    this.bar = {pos:add(copy(pos),P_BAR)};
    this.icon = {pos:add(pos,P_ICON)};
    this.amount = new Font(add(pos,P_AMOUNT)," " + this.max,"HP");//数字
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    this.InitChildren();
  }
  InitChildren(){
    let s;
    //outer
    s = Art.SpriteFactory(Art.UIPattern.HP.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    //bar
    let rect = new PIXI.Graphics();
    rect.beginFill(this.color);
    rect.drawRect(this.bar.pos.x,this.bar.pos.y,62,12);
    rect.endFill();
    s = rect;
    //s = Art.SpriteFactory(Art.UIPattern.HP.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    //icon
    s = Art.SpriteFactory(Art.UIPattern.HP.icon);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
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
