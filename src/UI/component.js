import UI from "./ui.js";
import Drawer from "../drawer.js";
import PopInEvent from "../Event/Component/popIn.js";
import BlinkEvent from "../Event/Component/blink.js";

class ComponentView extends UI {
  constructor(model) {
    super(vec2(0));
    this.sprite = model.sprite;
    this.size = model.size;
    this.frame = 0;
  }
  Update() {
    if (this.sprite.filters) this.sprite.filters[0].uniforms.time = this.frame;
    this.frame++;
  }
}
//コンポーネントは全て子を持ち、自身はスプライトを持たない
//終端コンポーネントは直属のUIに限られる
export default class Component extends UI {
  constructor(componentTree, style, parentComponent, NodeTag) {
    super(parentComponent.pos);
    this.type = "COMPONENT";
    this.NodeTag = NodeTag; //Styleのセレクタとして使う
    this.SetParent(parentComponent);
    this.size = copy(parentComponent.size);
    this.scale = vec2(1);
    this.style = style;
    this.componentTree = componentTree;
    this.eventList = [];
    this.isNoSprite = true;
    this.sprite = new PIXI.Container();
    this.graphics = new PIXI.Graphics();

    this.ParceStyle(style[this.NodeTag]);
    this.sprite.position = copy(this.pos);
    const view = new ComponentView(this);
    this.view = view;
    this.TraverseComponentTree(componentTree);
  }
  TraverseComponentTree(componentTree) {
    this.view.Add();
    this.Add();
    Object.keys(componentTree).forEach(component => {
      //終端ノード:UIをaddChild
      //if (component.startsWith("leaf")) {
      const childTree = componentTree[component];
      if (childTree.isUI) {
        const ui = childTree;
        ui.SetParent(this);
        ui.SetPos(this.pos);
        this.children.push(ui);
        ui.Add();
      } else {
        //枝ノード:部分木を解析
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
    this.Animate(new PopInEvent(this, value));
  }
  Blink(value) {
    this.Animate(new BlinkEvent(this, value));
  }
  Update() {
    this.ExecuteEvent();
    this.frame++;
  }
}
