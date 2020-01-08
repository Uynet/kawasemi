import Scene from "./scene.js";
import FadeEvent from "../Event/fadeEvent.js";
import EventManager from "../Event/eventmanager.js";

export default class Tutorial1Scene extends Scene {
  constructor() {
    super();
    this.name = "tutorial1";
  }
  Init() {
    this.frame = 0;
    this.onFadeInEnd = new Function();
    this.onFadeOutStart = new Function();
    this.onFadeOutEnd = new Function();
  }
  Update() {
    if (this.frame == 0)
      EventManager.Add(
        new FadeEvent(this.onFadeInEnd, this.onFadeOutStart, this.onFadeOutEnd)
      );
    this.frame++;
  }
}
