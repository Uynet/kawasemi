import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Util from '../util.js';
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

export default class GaugeBullet extends UI{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.isAlive = true;//消えたらfalse
    this.type = "BULLET"; 
    this.isMultiple = true;
    this.pos = pos;
    /*パラメータ*/
    this.max = Param.player.maxBullet;
    /*child*/
    this.outer = {pos:CPV(pos)};
    this.bar = {pos:CPV(pos)};
    this.icon = {pos:ADV(pos,P_ICON)};
    this.amount = new Font(ADV(pos,P_AMOUNT),this.max + "","BULLET");//数字

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
    let equip = Param.player.equip;
    s = Art.SpriteFactory(Art.UIPattern.bullet.icon[equip]);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
  }
  UpdateBar(bullet){
    //barの長さを更新
    this.container.children[1].scale.x = bullet/this.max;
    //bullet数字の更新
    this.amount.UpdateFont(bullet);
  }
  ChangeWeapon(name){
    //アイコンを武器に変更
    this.container.children[2].texture = Art.UIPattern.bullet.icon[name];
  }
  Update(){
    let to  = (56-this.pos.x);
    this.pos.x += to/8;
    this.container.position.x = this.pos.x;
  }
}
