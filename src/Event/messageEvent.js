import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import MapData from '../Stage/mapData.js';
import EventManager from '../Event/eventmanager.js';
import Game from '../Game.js';

//現在未使用
export default class MessageEvent extends Event{
  //「マップをリセットする関数」を返す
  constructor(text){
    super(1);
    function* po(){
      Game.isMes = true;
      UIManager.PopMessage(text);
      yield ;
    }
    let itt = po();
    this.func = itt;
  }
}
