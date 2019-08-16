import UI from "./ui.js";
import Event from "../Event/event.js";
import Drawer from "../drawer.js";

//ぽよぽよイベント
class PopInEvent extends Event {
  constructor(component, props) {
    super();
    let frame = 0;
    let delay = 0;
    component.sprite.scale.y = 0;
    component.sprite.scale.x = 0;
    const f = x => {
      const y = x * x * 4;
      return (
        1.0 - Math.pow(1 - x, 6) + Math.sin(y * Math.PI) * 0.4 * Math.exp(-y)
      );
    };
    const pos = copy(component.pos);
    function* popin() {
      while (delay < props.delay) {
        delay++;
        yield;
      }
      let sus = props.sus;
      if (!sus) sus = 20; //default
      while (frame <= sus) {
        const s = f(frame / sus);
        component.sprite.scale.y = s;
        component.sprite.scale.x = s;
        component.pos.x = pos.x + (component.size.x / 2) * (1 - s);
        component.pos.y = pos.y + (component.size.y / 2) * (1 - s);
        component.SetPos(component.pos);
        component.sprite.position.y++;
        frame++;
        yield;
      }
    }
    component.pos = copy(pos);
    this.func = popin();
  }
}

class BlinkEvent extends Event {
  constructor(component, props) {
    super();
    let frame = 0;
    let delay = 0;
    component.sprite.alpha = 0.0;
    function* gen() {
      while (delay < props.delay) {
        delay++;
        yield;
      }
      let sus = props.sus;
      if (!sus) sus = 20; //default
      while (frame <= sus) {
        if (frame % 6 < 3) component.sprite.alpha = 0.3;
        else component.sprite.alpha = 1.0;
        frame++;
        yield;
      }
      component.sprite.alpha = 1.0;
      yield;
    }
    this.func = gen();
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
        this.leaf = componentTree[component];
        this.leaf.SetPos(this.pos);
        this.children.push(this.leaf);
        //this.addChild(leaf);
        this.leaf.Add();
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
  Emit(event) {
    this.eventList.push(event);
  }
  SetSize(size) {
    this.size = size;
  }
  ParceStyle(style) {
    for (let property in style) {
      const value = style[property];
      switch (property) {
        case "margin":
          this.Margin(value);
          break;
        case "size":
          this.Size(value);
          break;
        case "color":
          this.Color(value);
          break;
        case "position":
          this.Position(value);
          break;
        case "popin":
          this.PopIn(value);
          break;
        case "blink":
          this.Blink(value);
          break;
        default:
          console.warn("unknown style:", property);
      }
    }
  }
  //v:比率
  Size(v) {
    this.size.x *= v.x;
    this.size.y *= v.y;
    this.SetSize(this.size);
  }
  Fill() {
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
  PopIn(value) {
    this.Emit(new PopInEvent(this, value));
  }
  Blink(value) {
    this.Emit(new BlinkEvent(this, value));
  }
  ResetStyle(style) {
    this.style = style;
    this.scale = vec2(1);
    this.pos = copy(this.parentComponent.pos);
    this.size = copy(this.parentComponent.size);
    this.ParceStyle(this.style[this.NodeTag]);
    this.sprite.position = this.pos;

    this.children.forEach(u => {
      //leafnode以外
      if (u.ResetStyle !== undefined) u.ResetStyle(style);
    });
  }
  ExecuteEvent() {
    //アニメーションイベント
    for (let e of this.eventList) {
      if (e.Do().done) this.eventList.remove(e);
    }
  }
  bitToFloat(c) {
    return {
      r: ((c >> 16) % 256) / 256,
      g: ((c >> 8) % 256) / 256,
      b: (c % 256) / 256
    };
  }
  Update() {
    this.ExecuteEvent();
    this.frame++;
    /*
    let c;
    if(this.color!==undefined)c = this.bitToFloat(this.color);
    */
    if (this.sprite.filters) this.sprite.filters[0].uniforms.time = this.frame;
    /*
    if(this.sprite.filters)this.sprite.filters[0].uniforms.r= c.r;
    if(this.sprite.filters)this.sprite.filters[0].uniforms.g= c.g;
    if(this.sprite.filters)this.sprite.filters[0].uniforms.b= c.b;
    */
  }
}
