import Input from "../input.js";
import Scene from "./scene.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Game from "../game.js";
import Audio from "../audio.js";
import TitlePage from "../UI/Page/titlePage.js";
import StagePage from "../UI/Page/stagePage.js";

export default class TitleScene extends Scene {
  constructor() {
    super();
    this.name = "title";
  }
  Input() {
    if (Input.isAnyKeyClick()) {
      MapData.DeleteStage();
      UIManager.Clean();
      Game.state.dispatch("onEnter");
    }
  }
  Init() {
    UIManager.add(new TitlePage());
    const stage = 0;
    MapData.CreateStage(stage, "ENTER");
  }
  Update() {
    EntityManager.UpdateTitle();
  }
}
