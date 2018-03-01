import Event from './event.js';
import EntityManager from '../Stage/entityManager.js';
import Game from '../Game.js';
import EventManager from './eventmanager.js';
import MapData from '../Stage/mapData.js';
import Art from '../art.js';
import Drawer from '../drawer.js';

/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StartStageEvent extends Event{
  constructor(){
    super(1);
    function* gen(){
      Game.scene.PushSubState("TRANS");
      /*ここでマップをロード*/
      MapData.DeleteStage();
      MapData.CreateStage(Game.stage,"ENTER");
      //ここで非同期
      Game.scene.ChangeState(STATE.TITLE,STATE.STAGE);
      Game.scene.PopSubState("TRANS");
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
