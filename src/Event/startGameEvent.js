import Event from "./event.js";
import Audio from "../audio.js";
import Game from "../game.js";
import EventManager from "./eventmanager.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";

/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StartGameEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      if (isDebugMode) Game.scene.ChangeState(STATE.STAGE);
      else Game.scene.ChangeState(STATE.LOADING);
      if (!isDebugMode) {
        //LOADING ANIMATION
        MapData.DeleteStage();
        for (let i = 0; i < 150; i++) {
          yield;
        }
        //LOADING終了
        UIManager.Clean();
        Game.scene.ChangeState(STATE.TITLE);
      }

      if (isDebugMode) MapData.CreateStage(Game.stage, "ENTER");
      else MapData.CreateStage(0, "ENTER");

      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
