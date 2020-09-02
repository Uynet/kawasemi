import Input from "../input.js";
import Scene from "./scene.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Game from "../game.js";
import TitlePage from "../UI/Page/titlePage.js";
import Flags from "./Script/flags.js";
import TestScript from "./Script/testScript.js";
import StagePage from "../UI/Page/stagePage.js";

export default class TitleScene extends Scene {
  constructor() {
    super();
    this.name = "title";
  }

  GoToWorldMap(){
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
      }
  };

  GoToScript(){
    Flags.a = true;
      Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        return new Promise(resolve => {
          UIManager.CleanBack();
          MapData.DeleteStage();
          UIManager.add(new StagePage());
          MapData.CreateStage(201, resolve);
        });
      };

      transitionState.onFadeOutStart = () => {
        Game.state.transit("script");
        const script = new TestScript();
        Game.state.getState().setScript(script);
      }
  }

  Input() {
    if (Input.isAnyKeyClick()) {
        if(!Flags.a) this.GoToScript();
        else this.GoToWorldMap();
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
