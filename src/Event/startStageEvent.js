import Event from './event.js';
import Game from '../game.js';
import EventManager from './eventmanager.js';
import MapData from '../Stage/mapData.js';
import Audio from '../audio.js';

/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StartStageEvent extends Event{
  constructor(){
    super(1);
    function* gen(){
      Audio.PlayBGM("stage1");
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
