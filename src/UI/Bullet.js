import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Util from '../util.js';
import Font from './font.js';

const P_AMOUNT = {
  x : 22, 
  y : 4, 
};
//HP Icon
const P_ICON = {
  x : -16, 
  y : 0, 
};

export default class Bullet extends UI{
  constructor(pos,name){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "BULLET"; 
    this.isMultiple = true;
    this.name = name;
    this.pos = pos;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new Font(ADV(pos,P_AMOUNT),"100","BULLET");//数字

    //pos
    /*スプライト*/
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //outer
    s = Art.SpriteFactory(Art.UIPattern.bullet.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    this.spid++;
    //bar
    s = Art.SpriteFactory(Art.UIPattern.bullet.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    this.spid++;
    //icon
    s = Art.SpriteFactory(Art.UIPattern.bullet.icon.missile);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
    /*パラメータ*/
    this.max = 100;
  }
  UpdateBar(bullet){
    //barの長さを更新
    this.container.children[1].scale.x = bullet/this.max;
    //bullet数字の更新
    this.amount.UpdateFont(bullet);
  }
  ChangeWeapon(name){
    //アイコンを武器に変更
    switch(name){
      case "1": this.container.children[2].texture = Art.UIPattern.bullet.icon.missile;
      break;
      case "2": this.container.children[2].texture = Art.UIPattern.bullet.icon.laser;
      break;
    }
  }
  Update(){
    let to  = (56-this.pos.x);
    this.pos.x += to/8;
    this.container.position.x = this.pos.x;
  }
}
