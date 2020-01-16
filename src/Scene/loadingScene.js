import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import Game from "../game.js";
import LoadingPage from "../UI/Page/loadingPage.js";
import MapData from "../Stage/mapData.js";

export default class LoadingScene extends Scene {
  constructor() {
    super();
    this.name = "loading";
  }
  Init() {
    this.frame = 0;
    UIManager.add(new LoadingPage()); //HP
    const stage = 0;
    MapData.CreateStage(stage, () => {
      this.OnLoadCompleted();
    });
  }
  OnLoadCompleted() {
    UIManager.Clean();
    Game.state.transit("title");
  }
  Update() {
    const wait = isDebugMode ? 10 : 100;
    UIManager.Update();
    this.frame++;
  }
}
