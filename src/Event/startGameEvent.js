import Event from './event.js';
import Audio from '../audio.js';
import Game from '../game.js';
import EventManager from './eventmanager.js';
import MapData from '../Stage/mapData.js';

/*初期状態タイトル画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StartGameEvent extends Event{
  constructor(){
    super(1);
    function* gen(){
      Audio.PlayBGM("title",0);
      Game.scene.ChangeState(STATE.INIT,STATE.TITLE);
      MapData.DeleteStage();
      MapData.CreateStage(0,"ENTER");
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
