import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import EventManager from '../Event/eventmanager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Bullet1AI from './AI/bullet1AI.js';
import Bullet from './bullet.js';
import BulletBlur from './Effect/bulletBlur.js';
import BrightCoin from'./Effect/brightCoin.js';
import Util from '../util.js';
import Sonic from './Effect/sonic.js';
import Stone from './Effect/stone.js';
import Flash from './Effect/flash.js';
import Fire from './Effect/fire.js';
import Smoke from './Effect/smoke.js';
import Explosion1 from './Effect/explosion1.js';

/*bullet1クラス*/
export default class Bullet1 extends Bullet{
  constructor(pos,vel){
    super(pos,vel,VEC0());
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet1;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = 1;//弾丸のHP 0になると消滅
    this.atk = 99;//攻撃力
    this.length = 180;//これは武器がもつ?
    this.launchedPos = CPV(pos);//射出された座標 射程距離の計算に必要 
    this.type = ENTITY.BULLET;
    /*AI*/
    this.AIList = [];
    this.AIList.push(new Bullet1AI(this));
  }

  Update(){
    /*□Effect BulletBulr*/
    if(this.frame%1 == 0){
      let p = CPV(this.pos);
      let v = VEC0();
      EntityManager.addEntity(new BulletBlur(p,v));
    }
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 飛行距離
    if(this.hp<=0 ||
      this.frame > 100 || 
      Util.distance(this.pos , this.launchedPos) > this.length){
      EntityManager.removeEntity(this);
 //     EventManager.eventList.push(new QuakeEvent(6));//ゆれ
//    EntityManager.addEntity(new Explosion1(CPV(this.pos)));
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
