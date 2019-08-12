import UI from "./ui.js";
import Event from "../Event/event.js"

//ぽよぽよイベント
class PopInEvent extends Event{
  constructor(value){
    super();
    this.value = value;
    let frame = 0;
    function* popin(){
      while(frame++<50){
        cl(frame)
      yield;
      }
    } 
    this.func = popin();
  }
}

//コンポーネントは全て子を持ち、自身はスプライトを持たない 
//終端コンポーネントは直属のUIに限られる
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

    this.eventList = [];

    this.graphics = new PIXI.Graphics();
    let r = 10;
    let g = 10;
    let b = 10;
    this.color = "0x" + r + g + b;
    this.ParceStyle(style[this.NodeTag]);
    this.graphics.beginFill(this.color, 1.0);
    this.graphics.drawRect(0, 0, this.size.x, this.size.y);
    this.graphics.endFill();
    this.sprite = this.graphics;
    this.TraverseComponentTree(componentTree);
    this.sprite.position = this.pos;
  }
  TraverseComponentTree(componentTree) {
    let offset_x = 0;
    Object.keys(componentTree).forEach(component => {
      //終端ノード:UIをaddChild
      if (component.startsWith("leaf")) {
        const leaf = componentTree[component];
        let spriteSize = leaf.GetSpriteSize();
        leaf.SetPos(vec2(offset_x, 0));
        //絶対位置
        leaf.globalPos = add(this.pos,leaf.pos);
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
    });
  }
  Emit(event){
    this.eventList.push(event);
  }
  SetSize(size) {
    this.size = size;
  }
  ParceStyle(style) {
    for (let property in style) {
      const value = style[property]; 
      switch (property) {
        case "margin": this.Margin(value); break;
        case "size": this.Size(value); break;
        case "color": this.Color(value); break;
        case "position": this.Position(value); break;
        case "popin": this.PopIn(value); break;
        default : console.warn("unknown style:",property);
      }
    }
  }
  //v:比率
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
  PopIn(value){
     this.Emit(new PopInEvent(value));
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
  ExecuteEvent(){
    //アニメーションイベント
    for(let e of this.eventList){
      if(e.Do().done){
        this.eventList.remove(e);
      }
    }
   }
  Update() {
    this.ExecuteEvent();
    this.children.forEach(u=>u.Update());
  }
}
