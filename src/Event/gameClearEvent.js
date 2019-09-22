import Audio from "../audio.js";
import Game from "../game.js";
import Param from "../param.js";
import EntityManager from "../Stage/entityManager.js";
import UIManager from "../UI/uiManager.js";
import Event from "./event.js";
import EventManager from "./eventmanager.js";
import FadeEvent from "./fadeEvent.js";

export default class GameClearEvent extends Event {
  constructor() {
    super();
    function* gen() {
      //ステータス退避
      Param.player.status = {
        hp: EntityManager.player.hp,
        bullet: EntityManager.player.bullet
      };

      let frame = 0;
      Game.scene.PushSubState("TRANS");
      Game.stage++;
      if (Game.stage == 11) {
        //Audio.isFadeout=true;
        Audio.StopBGM();
      }
      Audio.PlaySE("stageChange");
      UIManager.PopStage(Game.stage);
      EventManager.eventList.push(new FadeEvent("fadeout"));
      while (frame < 50) {
        frame++;
        yield;
      }

      Game.continuePoint = 11;
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
