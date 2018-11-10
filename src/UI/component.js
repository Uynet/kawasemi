import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Drawer from "../drawer.js";

const gameSreensize = Drawer.GetGameScreenSize();

export default class Component extends UI{
  constructor(style){
    super(style);
    this.pos = vec0();
    this.scale = vec2(1);
    this.originalWidth = 96;
    this.originalHeight = 32;
    this.ParceStyle(style);
    this.sprite = Art.CreateSprite(Art.UIPattern.message.frame); 
    this.sprite.position = this.pos;
    this.sprite.scale.x = this.scale.x;
    this.sprite.scale.y = this.scale.y;
  }
  SetFullScreen(){
    this.sprite.scale.x = gameSreensize.x/this.originalWidth;
    this.sprite.scale.y = gameSreensize.y/this.originalHeight;
  }
  SetSize(size){
    this.scale.x = size.x/this.originalWidth;
    this.scale.y = size.y/this.originalHeight;
  }
  ParceStyle(style){
    for(let property in style){
      switch(property){
        case "padding": this.Padding(style[property]);
      }
    }
  }
  Padding(padding){
    this.pos.x += padding.x;
    this.pos.y += padding.y;
    this.SetSize(sub(gameSreensize,scala(2,padding)));
  }
}
