import UI from './ui.js';
import UIManager from './uiManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Param from '../param.js';
import Gauge from "./gauge.js";

const POS_VALUE = {
  x : 22, 
  y : 4, 
};
//HP Icon
const POS_ICON = {
  x : -16, 
  y : 0, 
};
//weaponList
const POS_weaponList = {
  x : -12,
  y : 16,
}
const POS_BAR = {
  x : -3.5, 
  y : -7, 
};

export default class GaugeBullet extends Gauge{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.type = "BULLET"; 
    this.name = "bullet";
    /*パラメータ*/
    this.maxGaugeValue = Param.player.maxBullet;
    this.color = 0xCA5148;
    /*child*/
    this.outer = {pos:copy(pos)};
    this.bar = {pos:add(copy(pos),POS_BAR)};
    this.icon = {pos:add(pos,POS_ICON)};
    this.value = new Font(add(pos,POS_VALUE),this.maxGaugeValue + "","BULLET");//数字
    this.weaponList = {
      pos:add(pos,POS_weaponList),
      list: null,
      container : new PIXI.Container(),
    };

    /*スプライト*/
    this.weaponListPattern = Art.UIPattern.bullet.pop;
    this.container = new PIXI.Container();
    this.InitChildren();


  }
  InitWeaponList(){
    let s;
    let list = Object.keys(Param.player.havingWeaponList);
    list = list.filter((arr)=>{
      return Param.player.havingWeaponList[arr];
    })
    this.weaponList.list = list;
    //アイコンリストをぷっしゅ　
    let p = this.weaponList.pos; 
    //p = this.pos; 
    for(let w of this.weaponList.list){
      s = Art.CreateSprite(Art.UIPattern.bullet.pop[w]);
      s.position = p;
      this.container.addChild(s);
      p.x += 8;
    }
  }
  InitChildren(){
    //outer
    this.CreateChild("outer"); //outer
    
    //bar
    let rect = new PIXI.Graphics();
    rect.beginFill(this.color);
    rect.drawRect(this.bar.pos.x,this.bar.pos.y,62,12);
    rect.endFill();
    this.barSprite = rect;
    this.barSprite.position = this.bar.pos; 
    this.container.addChild(this.barSprite);
    //icon
    let equip = Param.player.equip;
    this.iconSprite = Art.CreateSprite(Art.UIPattern.bullet.icon[equip]);
    this.iconSprite.position = this.icon.pos; 
    this.container.addChild(this.iconSprite);
    //value
    this.container.addChild(this.value.container);
    this.InitWeaponList();
  }
  Push(weaponName){
    let p = copy(this.weaponList.pos); 
    let s = Art.CreateSprite(Art.UIPattern.bullet.pop[weaponName]);
    p.x += (this.weaponList.list.length-1)*8;
    s.position = p;
    this.container.addChild(s);
    this.weaponList.list.push(weaponName);
    //samall weapon list
  }
  ChangeWeapon(name){
    //アイコンを武器に変更
    this.iconSprite.texture = Art.UIPattern.bullet.icon[name];
  }
}
