import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Drawer from "../drawer.js";

const gameSreensize = Drawer.GetGameScreenSize();

export default class Component extends UI{
  constructor(componentTree,style,parentComponent,NodeTag){
    super(vec0());
    this.NodeTag = NodeTag;//Styleのセレクタとして使う
    this.parentComponent=parentComponent;
    this.scale = vec2(1);
    this.originalWidth = 96;
    this.originalHeight = 32;
    this.size = copy(parentComponent.size);
    this.style = style;

    this.ParceStyle(style[this.NodeTag]);
    const graphics = new PIXI.Graphics();

    let r =10  
    let g =10 
    let b =10 
    if(NodeTag=="root")  r = 90;
    if(NodeTag=="div")  g = 90;
    graphics.beginFill("0x"+r+g+b,0.5);
    graphics.drawRect(0,0,this.size.x,this.size.y);
    graphics.endFill();

    // this.sprite = Art.CreateSprite(Art.UIPattern.message.frame); 
    this.sprite = graphics; 

    this.TraverseComponentTree(componentTree);

    this.sprite.position = this.pos;
  }


  TraverseComponentTree(componentTree){
    Object.keys(componentTree).forEach(component=>{
      if (component == "leaf") {
        this.addChild(componentTree[component]);
      } else {
        const childTree = componentTree[component];
        const childComponent = new Component(childTree, this.style, this ,component)
        this.addChild(childComponent);
      }
    })
  }
  SetSize(size){
    this.size = size;
    this.scale.x = size.x/this.originalWidth/this.parentComponent.scale.x;
    this.scale.y = size.y/this.originalHeight/this.parentComponent.scale.y;
    //this.sprite.scale = copy(this.scale);
  }
  ParceStyle(style){
    for(let property in style){
      switch(property){
        case "margin": this.Margin(style[property]);
      }
    }
  }
  Margin(margin){
    console.log(margin)
    this.pos.x += margin.x;
    this.pos.y += margin.y;
    this.SetSize(vec2(
      this.size.x - 2*margin.x,
      this.size.y - 2*margin.y
      )
    )
  }
}
