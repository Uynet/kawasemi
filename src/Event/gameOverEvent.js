import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import MapData from '../Stage/mapData.js';
import Game from '../Game.js';
import Timer from '../timer.js';

export default class GameOverEvent extends Event{
  //Gameのstateを遷移状態に移行
  constructor(){
    super(1);
    function* Posreset(){
      let frame = 0;
      while(frame < 100){
        frame++;
      yield;
      }
      Game.seq = true;
      yield;
    }
    let itt = Posreset();
    this.func = itt;
  }
  
}
