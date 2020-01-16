import Drawer from "../drawer.js";
import Game from "../game.js";
import StagePop from "../UI/stagePop.js";
import UIManager from "../UI/uiManager.js";
import Event from "./event.js";
import MapData from "../Stage/mapData.js";

export default class ToBeContinuedEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      const p = vec2(96, 32);
      let frame = 0;
      while (frame < 50) {
        frame++;
        yield;
      }
      UIManager.add(new StagePop(p, "^ - To Be Continued... -$", 7));
      while (frame < 300) {
        frame++;
        yield;
      }

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
        Drawer.SetMagnification(3);
        Game.latestStage = Game.stage;
        Game.stage = 1;
        UIManager.CleanBack();
        Game.state.transit("title");
      };
      transitionState.onFadeOutEnd = () => {
        Drawer.SetMagnification(3);
      };

      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
