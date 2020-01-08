import Component from "../component.js";
import Font from "../font.js";
import UI from "../ui.js";

export default class selectModal extends UI {
  constructor(componentTree, style, selectTexts) {
    super(vec2(0));
    let selectUIs = [];
    selectTexts.forEach(t => {
      selectUIs.push(new Font(vec0(), t, "MES"));
    });
    const componentTree = {
      div: {
        //icon: { leaf: this.pointedItem },
        label: { leaf: new Font(vec0(), "かう?", "MES") },
        price: {
          leaf1: new Font(vec0(), "  " + this.pointedItem.price, "MES"),
          leaf2: coin
        },
        Y: { leaf: selects[0] },
        N: { leaf2: selects[1] }
      }
    };

    const hilight = 0xef1f6a;
    const main = 0x403080;
    const base = 0x100030;
    const accent = 0xf3b000;
    const style = {
      div: {
        margin: vec2(4),
        color: main,
        color: hilight,
        popin: { ease: bounceOut }
      },
      root: {
        margin: mul(vec2(0.3), gameSreensize),
        color: accent,
        popin: { delay: 0, ease: easeOutElastic }
      },
      label: { position: vec2(0.4, 0.15) },
      icon: { position: vec2(0.2, 0.1) },
      price: { position: vec2(0.3, 0.3) },
      Y: { position: vec2(0.4, 0.6) },
      N: { position: vec2(0.4, 0.75) }
    };
    this.children.push(this.component);
    this.component = new Component(componentTree, style, this, "root");
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
