import Font from "../font.js";
import UI from "../ui.js";

export default class TitlePage extends UI {
  constructor() {
    super(vec2(0));
    let p1 = vec2(96, 64);
    let p2 = vec2(p1.x, p1.y + 10);
    let p3 = vec2(p1.x - 8, p2.y + 48);
    let p4 = vec2(32, 200);
    this.addChild(new Font(p1, "さいはてどろっぷ", "MES")); //SCORE
    this.addChild(new Font(p2, "- ver0.33 -", "MES")); //SCORE
    this.addChild(new Font(p3, "Press Any Key", "MES")); //SCORE
    this.addChild(new Font(p4, "+ 2018-2019 uynet", "MES")); //SCORE
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
