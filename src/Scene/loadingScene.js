import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import Game from "../game.js";
import LoadingPage from "../UI/Page/loadingPage.js";

export default class LoadingScene extends Scene {
  constructor() {
    super();
    this.name = "loading";
  }
  Init() {
    this.frame = 0;
    UIManager.add(new LoadingPage()); //HP
  }
  Update() {
    const wait = isDebugMode ? 10 : 100;
    UIManager.Update();
    if (this.frame == wait) {
      UIManager.Clean();
      Game.state.transit("title");
    }
    this.frame++;
  }
}
