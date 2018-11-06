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
const P_BAR = {
  x : -3.5, 
  y : -7, 
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
    this.color = 0xCA5148;
    /*child*/
    this.outer = {pos:copy(pos)};
    this.bar = {pos:add(copy(pos),P_BAR)};
    this.icon = {pos:add(pos,P_ICON)};
    this.amount = new Font(add(pos,P_AMOUNT),this.max + "","BULLET");//数字
    this.wlist = {
      pos:add(pos,P_WLIST),
      list: null,
      container : new PIXI.Container(),
    };

    //pos
    /*スプライト*/
    this.wlistPattern = Art.UIPattern.bullet.pop;
    this.frame = new PIXI.Rectangle(0, 0,16,16);
    this.spid = 0;
    this.container = new PIXI.Container();
    this.InitChildren();


  }
  InitList(){
    let s;
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
  InitChildren(){
    let s;
    //outer
    s = Art.SpriteFactory(Art.UIPattern.bullet.outer);
    s.position = this.outer.pos; 
    this.container.addChild(s);
    //bar
    let rect = new PIXI.Graphics();
    rect.beginFill(this.color);
    rect.drawRect(this.bar.pos.x,this.bar.pos.y,62,12);
    rect.endFill();
    s = rect;
    //s = Art.SpriteFactory(Art.UIPattern.bullet.bar);
    s.position = this.bar.pos; 
    this.container.addChild(s);
    //icon
    let equip = Param.player.equip;
    s = Art.SpriteFactory(Art.UIPattern.bullet.icon[equip]);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //amount
    this.container.addChild(this.amount.container);
    this.InitList();
  }
  Push(weaponName){
    let p = copy(this.wlist.pos); 
    let s = Art.SpriteFactory(Art.UIPattern.bullet.pop[weaponName]);
    p.x += (this.wlist.list.length-1)*8;
    s.position = p;
    this.container.addChild(s);
    this.wlist.list.push(weaponName);
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
