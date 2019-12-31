import Input from "../input.js";
import Scene from "./scene.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Game from "../game.js";

export default class TitleScene extends Scene {
  constructor() {
    super();
    this.name = "title";
  }
  Init() {
    UIManager.SetTitle();
    const stage = 0;
    MapData.CreateStage(stage, "ENTER");
  }
  Update() {
    EntityManager.UpdateTitle();
    if (Input.isAnyKeyClick()) {
      Game.state.dispatch("onEnter");
    }
  }
}
