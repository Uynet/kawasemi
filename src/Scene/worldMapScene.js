import Scene from "./scene.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Input from "../input.js";
import WorldMapPage from "../UI/Page/worldMapPage.js";
import StagePage from "../UI/Page/stagePage.js";
import MapData from "../Stage/mapData.js";
import Game from "../game.js";

export default class WorldMapScene extends Scene {
  constructor() {
    super();
    this.name = "worldMap";
  }
  GoToTitle(){
      Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        return new Promise(resolve => {
          UIManager.CleanBack();
          MapData.DeleteStage();
          MapData.CreateStage(0, resolve);
        });
      };
      transitionState.onFadeOutStart = () => {
        Game.state.transit("title");
      };
      transitionState.onFadeOutEnd = () => {};
  }

  GoToStage(){
      Input.lock();
      Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        return new Promise(resolve => {
          UIManager.CleanBack();
          MapData.DeleteStage();
          UIManager.add(new StagePage());
          MapData.CreateStage(Game.stage, resolve);
        });
      };
      transitionState.onFadeOutStart = () => {
        Input.restore();
        Game.state.transit("main");
      };
      transitionState.onFadeOutEnd = () => {
        UIManager.PopStage();
      };

  };
  Input() {
    if (Input.isKeyClick(KEY.Z)) this.GoToTitle();
    if (Input.isKeyClick(KEY.X)) this.GoToStage();
  }
  Init() {
    UIManager.add(new WorldMapPage());
  }
  Update() {
    EntityManager.Update();
    UIManager.Update();
  }
}
