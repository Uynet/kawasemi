import Audio from "../audio.js";
import Game from "../game.js";
import Event from "./event.js";
import MapData from "../Stage/mapData.js";

export default class GameOverEvent extends Event {
  constructor() {
    super();
    function* gen() {
      let frame = 0;
      Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        MapData.DeleteStage();
        MapData.CreateStage(Game.stage);
      };
      transitionState.onFadeOutStart = () => {
        Game.state.transit("main");
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
