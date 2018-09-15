import UI from './ui.js';
import Enemy1 from "../Entity/Enemy/enemy1.js";
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Param from '../param.js';

const P_AMOUNT = {
  x : 48, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};

export default class gaugeBossHP extends UI{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "BossHP"; 
    this.isMultiple = true;
    this.pos = pos;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    let maxHP = Param.enemy1.hp;//
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    this.pattern = Art.UIPattern.HP;//
    let s;
    this.scale = 4;
    P_AMOUNT.x = 16*4*this.scale/2-8;
    this.amount = new Font(ADV(pos,P_AMOUNT),"" + maxHP,"HP");//数字
    //outer
    s = Art.SpriteFactory(this.pattern.outer);//
    s.position = this.outer.pos; 
    s.scale.x = this.scale;
    this.container.addChild(s);
    //bar
    s = Art.SpriteFactory(this.pattern.bar);
    s.position = this.bar.pos; 
    s.scale.x = this.scale;
    this.container.addChild(s);
    //icon
    s = Art.SpriteFactory(this.pattern.icon);
    s.position = this.icon.pos; 
    //this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
    /*パラメータ*/
    this.max = maxHP;
    /*state*/
    this.isPopIn = true;
  }
  SetBar(hp){
    //barの長さを更新
    this.container.children[1].scale.x = this.scale * hp/this.max;
    //HP数字の更新
    this.amount.SetFont(hp);
  }
  Update(){
    this.container.position.x = this.pos.x;
  }
}
