import Audio from "../audio.js";
import Game from "../game.js";
import Event from "./event.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";
import StagePage from "../UI/Page/stagePage.js";
import Drawer from "../drawer.js";

export default class GameOverEvent extends Event {
  constructor() {
    super();
    function* gen() {
      let frame = 0;
      Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        MapData.DeleteStage();
        UIManager.Clean();
        MapData.CreateStage(Game.stage);
        UIManager.add(new StagePage());
      };
      transitionState.onFadeOutStart = () => {
        Game.state.transit("main");
        Drawer.SetMagnification(3);
      };

      Audio.PlaySE("stageChange");

      while (frame < 30) {
        frame++;
        yield;
      }
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
