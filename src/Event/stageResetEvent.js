import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import MapData from '../Stage/mapData.js';
import EventManager from '../Event/eventmanager.js';

export default class StageResetEvent extends Event{
  //「マップをリセットする関数」を返す
  constructor(){
    super(1);
    function* po(){
      MapData.RebuildStage();
      //EventManager.eventList.pop();
      yield "end";
    }
    let itt = po();
    this.func = itt;
  }
}
