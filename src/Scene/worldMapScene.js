import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Input from "../input.js";
import WorldMapPage from "../UI/Page/worldMapPage.js";
import StagePage from "../UI/Page/stagePage.js";
import Audio from "../audio.js";
import MapData from "../Stage/mapData.js";
import Game from "../game.js";

export default class WorldMapScene extends Scene {
  constructor() {
    super();
    this.name = "worldMap";
  }
  Input() {
    if (Input.isKeyClick(KEY.X)) {
      UIManager.Clean();

      UIManager.add(new StagePage());
      UIManager.PopStage();
      Audio.StopBGM();
      MapData.CreateStage(Game.stage, "ENTER");

      Game.state.dispatch("onEnterStage");
    }
  }
  Init() {
    UIManager.add(new WorldMapPage());
  }
  Update() {
    EntityManager.Update();
    UIManager.Update();
  }
}
