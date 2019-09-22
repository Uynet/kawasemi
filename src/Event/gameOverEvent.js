import Audio from "../audio.js";
import Game from "../game.js";
import Event from "./event.js";
import EventManager from "./eventmanager.js";
import FadeEvent from "./fadeEvent.js";

export default class GameOverEvent extends Event {
  constructor() {
    super();
    function* gen() {
      //if(!Game.debug)Game.stage = Game.continuePoint;
      let frame = 0;
      EventManager.eventList.push(new FadeEvent("fadeout"));

      Audio.PlaySE("stageChange");
      //Audio.PlayBGM("stage5",0.2);
      //if(Game.debug)Audio.PlayBGM("stage5",0.0);

      while (frame < 30) {
        frame++;
        yield;
      }
      Game.scene.PushSubState("SEQ");
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
