import Game from "../game.js";
import MapData from "../Stage/mapData.js";
import UIManager from "../UI/uiManager.js";
import Event from "./event.js";

/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class QuitGameEvent extends Event {
  constructor() {
    super(1);
    function* gen() {
      Game.scene.ChangeState(STATE.TITLE);
      /*delete all entities*/
      MapData.DeleteStage();
      UIManager.Clean();
      /*Reinitialize Game*/
      Game.stage = 0;
      /*Setting Title*/
      UIManager.SetTitle();
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
