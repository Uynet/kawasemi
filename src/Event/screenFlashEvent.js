import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import Game from '../game.js';
import EventManager from './eventmanager.js';
import MapData from '../Stage/mapData.js';
import Drawer from "../drawer.js";

export default class ScreenFlashEvent extends Event{
  constructor(){
    super(1);
    function* gen(){
      //this may be flash
      let timer = 0;

      while(timer < 4){
        Drawer.Stage.filters = [Drawer.fireFilter];
        Drawer.Stage.filters[0].uniforms.paintCol = Math.floor(timer%4);
        timer++;
        yield;
      }
      Drawer.Stage.filters = [Drawer.testFilter];
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
