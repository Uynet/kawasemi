import Audio from "../audio.js";
import Game from "../game.js";
import Event from "./event.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";
import EntityManager from "../Stage/entityManager.js";

export default class StageSetClearEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      let frame = 0;
      Game.state.transit("transition");
      if (Game.latestStage < Game.stage) Game.latestStage = Game.stage;
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        EntityManager.player.ResetStatus();
        MapData.DeleteStage();
        UIManager.Clean();
      };
      transitionState.onFadeOutStart = () => {
        Game.state.transit("worldMap");
      };
      Audio.PlaySE("stageChange", -0.7);

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
