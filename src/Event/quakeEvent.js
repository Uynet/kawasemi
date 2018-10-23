import Event from './event.js';
import EventManager from './eventmanager.js';
import Drawer from '../drawer.js';

/*タイトル画面からゲーム開始画面に移行するイベント
 * (UIの退避)
 * UIのセット
 */
export default class QuakeEvent extends Event{
  constructor(size,time,isRot){
    //undefined
    if(time>=1 || !time) {
      console.warn("invalid time : " + time);
      time = 0.9
    };
    super(1);
    function* gen(){
      if(isRot){
        let frame = 0;
        let arg;
        while(frame < 200){
          arg = Math.sin(frame*0.1)*Math.exp(-frame*0.1)*0.4;
          Drawer.QuakeRot(arg);
          frame++;
          yield ;
        }
        Drawer.Stage.x = 0;
        Drawer.Stage.y = 0;
        yield ;
      }
      else { 
        let frame = 0;
        let d;
        while(size > 0.1){
          d = Rand2D(size);
          Drawer.Quake(d);
          size *= time;
          frame++;
          yield ;
        }
        Drawer.Stage.x = 0;
        Drawer.Stage.y = 0;
        yield ;
      }
    }
    let itt = gen();
    this.func = itt;
  }
}
