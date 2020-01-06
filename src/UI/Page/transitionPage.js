import UI from "../ui.js";

export default class TransitionPage extends UI {
  constructor() {
    super(vec2(0));
  }
  FadeIn() {}
  Update() {
    this.children.forEach(u => u.Update());
  }
}
