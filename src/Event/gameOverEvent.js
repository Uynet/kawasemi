import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import MapData from '../Stage/mapData.js';
import Game from '../Game.js';
import Timer from '../timer.js';
import Drawer from '../drawer.js';
import Art from '../art.js';

export default class GameOverEvent extends Event{
  //Gameのstateを遷移状態に移行
  constructor(){
    super(1);
    function* Posreset(){
      let frame = 0;
      let spid = 0;
      let pattern = Art.seqPattern;
      let seq = new Array(400);
      for(let i = 0; i < 400; i++) {
          let sp = Art.SpriteFactory(pattern[spid]);
          let y = Math.floor(i/20);
          let x = i%20;
          sp.position.x = x*16-8;
          sp.position.y = y*16-8;
          seq[i] = sp;
          Drawer.addContainer(sp,"FILTER");
      }
      while(frame < 100){
        spid = Math.min(Math.floor(frame/2),31);
        for(let i = 0; i < 400; i++) {
          seq[i].texture = pattern[spid];
        }
        frame++;
        yield;
      }
      for(let i = 0; i < 400; i++) {
        Game.seq = true;
        Drawer.removeContainer(seq[i],"FILTER");
      }
      yield;
    }
    let itt = Posreset();
    this.func = itt;
  }

}
