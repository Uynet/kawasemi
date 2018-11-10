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
    this.size = vec2(96,32)
    this.size = gameSreensize;

    this.scale = vec2(1);

    const style = {
      padding : vec2(4),
    }

    const componentTree = { }

    const component = new Component(componentTree,style,this);
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
