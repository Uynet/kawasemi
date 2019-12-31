import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import Game from "../game.js";

export default class LoadingScene extends Scene {
  constructor() {
    super();
    this.name = "loading";
  }
  Init() {
    this.frame = 0;
    UIManager.SetLoading();
  }
  Update() {
    UIManager.Update();
    if (this.frame == 15) {
      UIManager.Clean();
      Game.state.dispatch("loadComplete");
    }
    this.frame++;
  }
}
