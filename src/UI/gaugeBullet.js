import UI from './ui.js';
import UIManager from './uiManager.js';
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
//WLIST
const P_WLIST = {
  x : -12,
  y : 16,
}
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
    this.wlist = {
      pos:ADV(pos,P_WLIST),
      list: null,
      container : new PIXI.Container(),
    };

    //pos
    /*スプライト*/
    this.wlistPattern = Art.UIPattern.bullet.pop;
    this.frame = new PIXI.Rectangle(0, 0,16,16);
    this.spid = 0;
    this.container = new PIXI.Container();
    let s;
    //outer
    s = Art.SpriteFactory(Art.UIPattern.bullet.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    //bar
    s = Art.SpriteFactory(Art.UIPattern.bullet.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    //icon
    let equip = Param.player.equip;
    s = Art.SpriteFactory(Art.UIPattern.bullet.icon[equip]);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);

    let list = Object.keys(Param.player.havingWeaponList);
    list = list.filter((arr)=>{
      return Param.player.havingWeaponList[arr];
    })
    this.wlist.list = list;
    //アイコンリストをぷっしゅ　
    let p = this.wlist.pos; 
    //p = this.pos; 
    for(let w of this.wlist.list){
      s = Art.SpriteFactory(Art.UIPattern.bullet.pop[w]);
      s.position = p;
      this.container.addChild(s);
      p.x += 8;
    }

  }
  Push(w){
    let p = CPV(this.wlist.pos); 
    let s = Art.SpriteFactory(Art.UIPattern.bullet.pop[w]);
    p.x += (this.wlist.list.length-1)*8;
    s.position = p;
    this.container.addChild(s);
    this.wlist.list.push(w);
    //samall weapon list
  }
  SetBar(bullet){
    //barの長さを更新
    this.container.children[1].scale.x = bullet/this.max;
    //bullet数字の更新
    this.amount.SetFont(bullet);
  }
  ChangeWeapon(name){
    //アイコンを武器に変更
    this.container.children[2].texture = Art.UIPattern.bullet.icon[name];
  }
  Update(){
    this.container.position.x = this.pos.x;
  }
}
