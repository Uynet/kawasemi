import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import Game from '../Game.js';
import EventManager from './eventmanager.js';
import MapData from '../Stage/mapData.js';

/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StartGameEvent extends Event{
  constructor(){
    super(1);
    function* po(){
      Game.scene.ChangeState(STATE.INIT,STATE.TITLE);
      yield ;
    }
    let itt = po();
    this.func = itt;
  }
}
