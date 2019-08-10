import UI from './ui.js';
import Game from "../game.js";
import Drawer from "../drawer.js";
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Component from "./component.js";

const gameSreensize = Drawer.GetGameScreenSize();

export default class Shop extends UI{
  constructor(){
    super(vec0());
    this.type = "SHOP";
    this.sprite = new PIXI.Sprite();
    this.size = vec2(96,32);
    this.size = gameSreensize;

    this.scale = vec2(1);

    /*SYNTAX
       オリジナルUI記述文法
       [node] : 子を持つノード。名前はstyleで使う
       leaf : このノードが葉であることを宣言、要素のUIがレンダリングされる
    */
    const style = {
      div:{
        margin : vec2(4),
        color:0x212020
      },
      price:{
        margin : vec2(8),
        position : vec2(0.8,0),
        size   : vec2(0.2,0.2),
        color:0x212040
      },
      list:{
        margin : vec2(8),
        size   : vec2(0.5,0.4),
        color:0x212040
      },
      description:{
        position : vec2(0,0.5),
        margin: vec2(8,0),
        size   : vec2(1.0,0.4),
        color:0x212040
      },
      root:{
        margin : mul(vec2(0.05),this.size),
        color:0xd0d0d0
      }
    }

    let text = (new Font(vec2(0),"ここにせつめいぶんがでる","MES"));
    let text_price = (new Font(vec2(0),"5000G","MES"));

    let normal = new UI(this.pos);
    let missile = new UI(this.pos);
    let laser = new UI(this.pos);
    let weapon4 = new UI(this.pos);
    let weapon5 = new UI(this.pos);
    normal.sprite = Art.CreateSprite(Art.UIPattern.bullet.icon.normal); 
    missile.sprite = Art.CreateSprite(Art.UIPattern.bullet.icon.missile); 
    laser.sprite = Art.CreateSprite(Art.UIPattern.bullet.icon.laser); 
    weapon4.sprite = Art.CreateSprite(Art.UIPattern.bullet.icon.weapon4); 
    weapon5.sprite = Art.CreateSprite(Art.UIPattern.bullet.icon.weapon5); 

    const componentTree = {
      div: {
        list:{
          leaf1 : normal , 
          leaf2 : missile, 
          leaf3 : laser, 
          leaf4 : weapon4, 
          leaf5 : weapon5, 
        },
        price:{
          leaf:text_price
        },
        description:{
          leaf6:text
        }
      }
    };

    const component = new Component(componentTree,style,this,"root");
    this.addChild(component);
  }
  Update(){
    if(this.frame > 1){
      if(Input.isKeyClick(KEY.C)){
        Game.scene.PopSubState();
        UIManager.removeUI(this);
      }
    }
    this.frame++;
  }
}
