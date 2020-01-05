import Drawer from "../drawer.js";
import Game from "../game.js";
import MapData from "../Stage/mapData.js";
import StagePop from "../UI/stagePop.js";
import UIManager from "../UI/uiManager.js";
import Event from "./event.js";
import EventManager from "./eventmanager.js";
import FadeEvent from "./fadeEvent.js";

export default class ToBeContinuedEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      const p = vec2(96, 32);
      Game.stage = 1;
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
      EventManager.eventList.push(new FadeEvent("fadeout"));
      while (frame < 250) {
        frame++;
        yield;
      }
      MapData.DeleteStage();
      UIManager.Clean();
      Drawer.SetMagnification(3);
      Game.scene.ChangeState(STATE.TITLE);
      MapData.CreateStage(0, "ENTER");

      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
