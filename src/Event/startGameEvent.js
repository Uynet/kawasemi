import Event from './event.js';
import Game from '../game.js';
import EventManager from './eventmanager.js';

/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StartGameEvent extends Event{
  constructor(){
    super(1);
    function* gen(){
      Game.scene.ChangeState(STATE.INIT,STATE.TITLE);
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
