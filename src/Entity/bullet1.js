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

const BULLET1 = {
  HP : 1,
  ATK_MAX : 99,
  CURVE : 0.1,
}

/*bullet1クラス*/
//Missile
export default class Bullet1 extends Bullet{
  constructor(pos,vi,arg,weapon){
    super(pos,POV(arg,vi));
    /*基本情報*/
    this.frame = 0;
    this.arg = arg;
    this.vi = vi;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
      this.isUpdater  =true;
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet1;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = BULLET1.HP;//弾丸のHP 0になると消滅
    this.atk = BULLET1.ATK_MAX;//攻撃力
    this.curve = BULLET1.CURVE;
    this.type = ENTITY.BULLET;
    /*AI*/
    this.AIList = [];
    this.AIList.push(new Bullet1AI(this));
  }

  Update(){
    /*□Effect BulletBulr*/
    if(this.frame%1 == 0){
      let p = CPV(this.pos);
      let v = Rand2D(1);
      EntityManager.addEntity(new BulletBlur(p,v));
    }
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 経過時間
    if(this.hp<=0 ||
      this.frame > 100) {
      EntityManager.removeEntity(this);
      EventManager.eventList.push(new QuakeEvent(6,3));//ゆれ
      EntityManager.addEntity(new Explosion1(CPV(this.pos)));
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = this.arg + Math.PI/2;
    this.sprite.texture = this.pattern[this.spid];

    this.spid = (this.spid+0)%4;
    this.frame++;
  }
}
