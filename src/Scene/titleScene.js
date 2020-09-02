import Input from "../input.js";
import Scene from "./scene.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Game from "../game.js";
import TitlePage from "../UI/Page/titlePage.js";

export default class TitleScene extends Scene {
  constructor() {
    super();
    this.name = "title";
  }
  Input() {
    if (Input.isAnyKeyClick()) {
        Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        return new Promise(resolve => {
          UIManager.CleanBack();
          MapData.DeleteStage();
          resolve();
        });
      };
      transitionState.onFadeOutStart = () => {
        Game.state.transit("worldMap");
      };
    }
  }
  Init() {
    UIManager.add(new TitlePage());
  }
  Update() {
    UIManager.Update();
    EntityManager.UpdateTitle();
  }
}
