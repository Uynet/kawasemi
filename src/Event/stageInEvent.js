import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import Scene from './scene.js';

/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class StageResetEvent extends Event{
  constructor(){
    super(1);
    let func = this.ReturnFunc();
    this.func = func;
  }

  ReturnFunc(){
    let func = () =>{
      cl("stage");
      Scene.state = STATE.STAGE;
      UIManager.SetStage();
    }
    return func;
  }
}
