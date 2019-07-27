import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Drawer from "../drawer.js";

const gameSreensize = Drawer.GetGameScreenSize();

export default class Component extends UI{
  constructor(componentTree,style,parentComponent){
    super(vec0());
    this.parentComponent=parentComponent;
    this.scale = vec2(1);
    this.originalWidth = 96;
    this.originalHeight = 32;
    this.size = copy(parentComponent.size);
    this.style = style;

    this.sprite = Art.CreateSprite(Art.UIPattern.message.frame); 

    this.ParceStyle(style);
    this.TraverseComponentTree(componentTree);

    this.sprite.position = this.pos;
  }
  TraverseComponentTree(componentTree){
    Object.keys(componentTree).forEach(component=>{
      const childTree = componentTree[component];
      this.addChild(new Component(childTree,this.style,this));
    })
  }
  SetSize(size){
    this.size = size;
    this.scale.x = size.x/this.originalWidth/this.parentComponent.scale.x;
    this.scale.y = size.y/this.originalHeight/this.parentComponent.scale.y;
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
    this.SetSize(vec2(
      this.size.x - 2*padding.x,
      this.size.y - 2*padding.y
      )
    )
  }
}
