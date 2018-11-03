import EFFECT from '../effect.js';
import Drawer from "../../../drawer.js";
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Explosion1 from "./explosion1.js";
import Pool from '../../../Stage/pool.js';
import Stone2 from './stone2.js';
import ScreenFlash from "./screenFlash.js";
import EventManager from "../../../Event/eventmanager.js";
import ScreenFlashEvent from "../../../Event/screenFlashEvent.js";

//爆発エフェクト
export default class Explosion5 extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos,VECN(8));
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb(){
    let exp = new Explosion1(CPV(this.pos));
    EntityManager.addEntity(exp);
  }

  Update(){
    //爆発して自分は消える
    if(this.frame == 0){
      EventManager.PushEvent(new ScreenFlashEvent(this.pos));
      let screenFlash = new ScreenFlash(CPV(this.pos));
      EntityManager.addEntity(screenFlash);
    }
    if(this.frame == 4) this.Bomb();
    if(this.frame > 5) EntityManager.removeEntity(this);
    this.frame++;
  }
}
