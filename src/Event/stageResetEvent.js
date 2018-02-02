import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import MapData from '../Stage/mapData.js';

export default class StageResetEvent extends Event{
  //「マップをリセットする関数」を返す
  constructor(){
    super(1);
    let PositionReset = this.ReturnFunc();
    this.func = PositionReset;
  }

  ReturnFunc(){
    let posreset = () =>{
      MapData.RebuildStage();
    }
    return posreset;
  }
}
