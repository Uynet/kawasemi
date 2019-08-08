import UI from './ui.js';
import Audio from "../audio.js";
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
    this.pos = pos;
    /*child*/
    this.outer = {pos:copy(pos)};
    this.bar = {pos:copy(pos)};
    this.icon = {pos:add(pos,P_ICON)};
    let maxHP = Param.enemy1.hp;//
    /*スプライト*/
    this.spid = 0;
    this.sprite = new PIXI.Container();
    this.pattern = Art.UIPattern.HP;//
    let s;
    this.scale = 4;
    P_AMOUNT.x = 16*4*this.scale/2-8;
    this.amount = new Font(add(pos,P_AMOUNT),"" + maxHP,"HP");//数字
    //outer
    s = Art.Sprite(this.pattern.outer);//
    s.position = this.outer.pos; 
    s.scale.x = this.scale*0.97;
    this.sprite.addChild(s);
    //bar
    s = Art.Sprite(this.pattern.bar);
    s.position = this.bar.pos; 
    s.position.x += 0
    s.scale.x = this.scale;
    this.sprite.addChild(s);
    //icon
    s = Art.Sprite(this.pattern.icon);
    s.position = this.icon.pos; 
    //this.sprite.addChild(s);
    //amount
    this.sprite.addChild(this.amount.sprite);
    /*パラメータ*/
    this.max = maxHP;
    /*state*/
    this.isPopIn = true;
    this.isInitialized = false;
    this.initHP = 0;
    this.isUpdater = true;
  }
  SetBar(hp){
    if(this.isInitialized){
      //barの長さを更新
      this.sprite.children[1].scale.x = this.scale * hp/this.max;
      //HP数字の更新
      this.amount.SetFont(hp);
    }
  }
  Update(){
    if(!this.isInitialized){
      Audio.PlaySE("empty");
      this.sprite.children[1].scale.x = this.scale * this.initHP/this.max;
      this.initHP+=this.max/50;
      this.amount.SetFont(this.initHP);
      if(this.initHP >= this.max)this.isInitialized = true;
    }
    this.sprite.position.x = this.pos.x;
  }
}
