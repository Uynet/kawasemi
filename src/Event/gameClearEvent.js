import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import MapData from '../Stage/mapData.js';
import Game from '../Game.js';


/*現状使われてない*/
export default class GameClearEvent extends Event{
  //Gameのstateを遷移状態に移行
  constructor(){
    super(1);
    let PositionReset = this.ReturnFunc();
    this.func = PositionReset;
  }

  ReturnFunc(){
    cl("こんにちは")
    let posreset = () =>{
      Game.stage++;
      Game.seq = true;
    }
    return posreset;
  }
}