import Event from './event.js';
import UIManager from '../UI/uiManager.js';
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
export default class QuakeEvent extends Event{
  constructor(size,time){
    //undefined
    if(!time) {
      time = 5
    };
    super(1);
    function* gen(){
      let frame = 0;
      let d = {
        x:size * (Math.random()-0.5),
        y:size * (Math.random()-0.5)
      };
      while(frame < time){
        Drawer.Quake(d);
        d.x *= 0.6;
        d.y *= 0.6;
        frame++;
        yield ;
      }
      Drawer.Stage.x = 0;
      Drawer.Stage.y = 0;
      yield ;
    }
    let itt = gen();
    this.func = itt;
  }
}
