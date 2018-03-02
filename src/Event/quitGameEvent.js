import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import Game from '../game.js';
import EventManager from './eventmanager.js';
import MapData from '../Stage/mapData.js';

/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class QuitGameEvent extends Event{
  constructor(){
    super(1);
    function* gen(){
      Game.scene.ChangeState(STATE.STAGE,STATE.TITLE);
      /*delete all entities*/
      MapData.DeleteStage();
      UIManager.Clean();
      /*Reinitialize Game*/
      Game.stage = 0;
      /*Setting Title*/
      UIManager.SetTitle();
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
