import UI from "../../UI/ui.js";

export default class NodeList extends UI {
  constructor(nodes) {
    super(vec2(0));
    this.layer = "ENTITY";
    nodes.forEach(node => this.addChild(node));
    this.nodes = nodes;
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}