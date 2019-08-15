import UI from "./ui.js";
import Event from "../Event/event.js"
import Drawer from "../drawer.js";

//ぽよぽよイベント
class PopInEvent extends Event{
  constructor(component , value){
    super();
    this.value = value;
    let frame = 0;
    function* popin(){
      while(frame++<50){
        component.SetSize(vec2(frame))
        component.pos.y++;
        component.SetPos(component.pos)
        component.sprite.position.y ++;
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
    super(parentComponent.pos);
    this.type = "COMPONENT";
    this.NodeTag = NodeTag; //Styleのセレクタとして使う
    this.parentComponent = parentComponent;
    this.scale = vec2(1);
    this.size = copy(parentComponent.size);
    this.style = style;
    this.componentTree = componentTree;
    this.sprite = new PIXI.Container();

    this.eventList = [];
    this.graphics = new PIXI.Graphics();

    this.ParceStyle(style[this.NodeTag]);
    this.sprite.position = copy(this.pos);
    this.TraverseComponentTree(componentTree);
  }
  TraverseComponentTree(componentTree) {
      this.Add();
    Object.keys(componentTree).forEach(component => {
      //終端ノード:UIをaddChild
      if (component.startsWith("leaf")) {
        const leaf = componentTree[component];
        leaf.SetPos(this.pos)
        this.children.push(leaf);
        //this.addChild(leaf);
        leaf.Add();
      } else {
        //枝ノード:部分木を解析
        const childTree = componentTree[component];
        const childComponent = new Component(
          childTree,
          this.style,
          this,
          component
        );
        this.children.push(childComponent);
        //this.addChild(childComponent);
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
    this.SetSize(this.size);
  }
  Fill(){
    this.graphics.beginFill(this.color, 1);
    this.graphics.drawRect(0, 0, this.size.x, this.size.y);
    this.graphics.endFill();
    this.sprite = this.graphics;
    this.sprite.filters = [Drawer.shopFilter]; 
  }
  Color(c) {
    this.color = c;
    this.Fill();
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
     this.Emit(new PopInEvent(this,value));
  }
  ResetStyle(style) {
    this.style = style;
    this.scale = vec2(1);
    this.pos = copy(this.parentComponent.pos);
    this.size = copy(this.parentComponent.size);
    this.ParceStyle(this.style[this.NodeTag]);
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
  bitToFloat(c){
    return { 
      r:((c>>16)%256)/256,
      g:((c>>8)%256)/256,
      b:(c%256)/256
    };
  }
  Update() {
    this.ExecuteEvent();
    this.frame++;
    /*
    let c;
    if(this.color!==undefined)c = this.bitToFloat(this.color);
    */
    if(this.sprite.filters)this.sprite.filters[0].uniforms.time = this.frame;
    /*
    if(this.sprite.filters)this.sprite.filters[0].uniforms.r= c.r;
    if(this.sprite.filters)this.sprite.filters[0].uniforms.g= c.g;
    if(this.sprite.filters)this.sprite.filters[0].uniforms.b= c.b;
    */
  }
}
