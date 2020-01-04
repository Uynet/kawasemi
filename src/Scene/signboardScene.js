import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import Game from "../game.js";

export default class SignboardScene extends Scene {
  constructor() {
    super();
    this.name = "signboard";
  }
  Init() {
    this.frame = 0;
    UIManager.PopMessage(this);
  }
  Update() {
    UIManager.Update();
    if (this.frame == 100) {
      UIManager.Clean();
      Game.state.dispatch("loadComplete");
    }
    this.frame++;
  }
}
