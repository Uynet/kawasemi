import Font from "../font.js";
import UI from "../ui.js";
import Input from "../../input.js";

export default class WorldMapPage extends UI {
  constructor() {
    super(vec2(0));
    let p1 = vec2(96, 64);
    this.addChild(new Font(p1, "わーるどまっぷ", "MES"));
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
