import Audio from "../audio.js";
import Game from "../game.js";
import UIManager from "../UI/uiManager.js";
import Event from "./event.js";
import EventManager from "./eventmanager.js";
import FadeEvent from "./FadeEvent.js";

/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StartStageEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      let frame = 0;
      Game.scene.PushSubState("TRANS");
      EventManager.eventList.push(new FadeEvent("fadeout"));
      Audio.PlaySE("stageChange");
      Audio.StopBGM();
      while (frame < 50) {
        frame++;
        yield;
      }
      Audio.StopBGM();
      //ここで非同期
      Game.scene.ChangeState(STATE.STAGE);
      //Game.scene.PopSubState("TRANS");
      UIManager.PopStage();
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
