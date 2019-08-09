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
    this.size = scala(0.8,this.size);

    this.scale = vec2(1);

    /*SYNTAX
       オリジナルUI記述文法
       [node] : 子を持つノード。名前はなんでもいいが、多分のちに上のstyleで使うと思う  
       leaf : このノードが葉であることを宣言、要素のUIがレンダリングされる
    */
    const style = {
      div:{
        margin : vec2(16),
      },
      root:{
        margin : vec2(0),
      }
    }
    let text = new Font(this.pos,"div","MES");
    let text2 = new Font(this.pos,"div in div","MES");
    const componentTree = {
      div: {
        leaf : text,
        div:{
          leaf:text2
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
