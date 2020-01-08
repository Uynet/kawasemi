import Audio from "../audio.js";
import Game from "../game.js";
import Event from "./event.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";

export default class StageSetClearEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      console.log("clear ");
      let frame = 0;
      Game.state.transit("transition");
      Game.latestStage = Game.stage;
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        MapData.DeleteStage();
        UIManager.Clean();
      };
      transitionState.onFadeOutStart = () => {
        Game.state.transit("worldMap");
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
