import Scene from "./scene.js";
import FadeEvent from "../Event/fadeEvent.js";
import EventManager from "../Event/eventmanager.js";
import EntityManager from "../Stage/entityManager.js";
import UIManager from "../UI/uiManager.js";
import FadePage from "../UI/Page/fadePage.js";

// ステージの移り変わりなどでリソース読み込みをするシーン
export default class TransitionScene extends Scene {
  constructor() {
    super();
    this.name = "transition";
  }
  Init() {
    this.frame = 0;
    this.onFadeInEnd = new Function();
    this.onFadeOutStart = new Function();
    this.onFadeOutEnd = new Function();
  }
  Update() {
    UIManager.Update();
    if (this.frame == 0)
      UIManager.add(
        new FadePage(this.onFadeInEnd, this.onFadeOutEnd, this.onFadeOutStart)
      );
    this.frame++;
  }
}
