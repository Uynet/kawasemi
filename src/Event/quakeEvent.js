import Event from './event.js';
import EventManager from './eventmanager.js';
import Drawer from '../drawer.js';

/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class QuakeEvent extends Event{
  constructor(size,time){
    //undefined
    if(!time) {
      console.warn("invalid time : " + time);
      time = 5
    };
    super(1);
    function* gen(){
      let frame = 0;
      let d;
      while(size > 0.1){
        d = Rand2D(size);
        Drawer.Quake(d);
        size *= 0.9;
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
