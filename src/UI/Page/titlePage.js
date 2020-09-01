import Font from "../font.js";
import UI from "../ui.js";
import Text from "../text.js";

export default class TitlePage extends UI {
  constructor() {
    super(vec2(0));
    let p1 = vec2(96, 64);
    let p2 = vec2(p1.x, p1.y + 10);
    let p3 = vec2(p1.x - 8, p2.y + 48);
    let p4 = vec2(32, 200);
    this.addChild(new Text(p1, "さいはてどろっぷ", "MES"));
    this.addChild(new Font(p2, "- ver0.42 -", "MES"));
    this.addChild(new Font(p3, "Press Any Key", "MES"));
    this.addChild(new Font(p4, "+ 2018-2020 uynet", "MES"));
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
