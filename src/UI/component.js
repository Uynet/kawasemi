import UI from "./ui.js";
import UIManager from "./uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Art from "../art.js";
import Input from "../input.js";
import Font from "./font.js";
import Drawer from "../drawer.js";

export default class Component extends UI {
  constructor(componentTree, style, parentComponent, NodeTag) {
    super(vec0());
    this.type = "COMPONENT";
    this.NodeTag = NodeTag; //Styleのセレクタとして使う
    this.parentComponent = parentComponent;
    this.scale = vec2(1);
    this.size = copy(parentComponent.size);
    this.style = style;
    this.componentTree = componentTree;

    this.graphics = new PIXI.Graphics();
    let r = 10;
    let g = 10;
    let b = 10;
    this.color = "0x" + r + g + b;
    this.ParceStyle(style[this.NodeTag]);
    this.graphics.beginFill(this.color, 1.0);
    this.graphics.drawRect(0, 0, this.size.x, this.size.y);
    this.graphics.endFill();
    // this.sprite = Art.CreateSprite(Art.UIPattern.message.frame);
    this.sprite = this.graphics;
    this.TraverseComponentTree(componentTree);
    //this.pos = copy(this.parentComponent.pos);
    this.sprite.position = this.pos;
  }
  TraverseComponentTree(componentTree) {
    let i = 0; //index
    let offset_x = 0;
    Object.keys(componentTree).forEach(component => {
      //終端ノード:UIをaddChild
      if (component.startsWith("leaf")) {
        const leaf = componentTree[component];
        let spriteSize = leaf.GetSpriteSize();
        leaf.SetPos(vec2(offset_x, 0));
        offset_x += spriteSize.x;
        this.addChild(leaf);
      } else {
        //枝ノード:部分木を解析
        const childTree = componentTree[component];
        const childComponent = new Component(
          childTree,
          this.style,
          this,
          component
        );
        this.addChild(childComponent);
      }
      i++;
    });
  }
  SetSize(size) {
    this.size = size;
    //this.scale.x = size.x/this.originalWidth/this.parentComponent.scale.x;
    //this.scale.y = size.y/this.originalHeight/this.parentComponent.scale.y;
    //this.sprite.scale = copy(this.scale);
  }
  ParceStyle(style) {
    for (let property in style) {
      switch (property) {
        case "margin":
          this.Margin(style[property]);
          break;
        case "size":
          this.Size(style[property]);
          break;
        case "color":
          this.Color(style[property]);
          break;
        case "position":
          this.Position(style[property]);
          break;
      }
    }
  }
  Size(v) {
    this.size.x *= v.x;
    this.size.y *= v.y;
  }
  Color(c) {
    this.color = c;
  }
  Position(pos) {
    this.pos.x += this.size.x * pos.x;
    this.pos.y += this.size.y * pos.y;
  }
  Margin(margin) {
    this.pos.x += margin.x;
    this.pos.y += margin.y;
    this.SetSize(vec2(this.size.x - 2 * margin.x, this.size.y - 2 * margin.y));
  }
  ResetStyle(style) {
    this.style = style;
    this.scale = vec2(1);
    this.pos = vec2(0);
    this.size = copy(this.parentComponent.size);
    this.ParceStyle(this.style[this.NodeTag]);
    this.graphics.beginFill(this.color, 1.0);
    this.graphics.drawRect(0, 0, this.size.x, this.size.y);
    this.graphics.endFill();
    this.sprite = this.graphics;
    this.sprite.position = this.pos;

    this.children.forEach(u=>{
      //leafnode以外
      if(u.ResetStyle!==undefined)u.ResetStyle(style)
    }); 
  }
  Update() {}
}
