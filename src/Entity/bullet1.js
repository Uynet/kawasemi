import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import EventManager from '../Event/eventmanager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Bullet1AI from './AI/bullet1AI.js';
import Horming from './AI/horming.js';
import Bullet from './bullet.js';
import BulletBlur from './Effect/bulletBlur.js';
import Util from '../util.js';
import Explosion1 from './Effect/explosion1.js';
import Param from '../param.js';

const bullet1 = Param.bullet1;

/*bullet1クラス*/
//Missile
export default class Bullet1 extends Bullet{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    /*基本情報*/
    this.frame = 0;
    this.arg = weapon.arg;
    this.vi = weapon.speed;
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
    this.hp = Param.bullet1.hp;//弾丸のHP 0になると消滅
    this.atk = Param.bullet1.atkMax;//攻撃力
    this.curve = Param.bullet1.curve;
    //this.boost = 1.5;
    this.type = ENTITY.BULLET;
    /*AI*/
    this.AIList = [];
    this.AIList.push(new Bullet1AI(this));
    if(weapon.isHorming) this.AIList.push(new Horming(this));
  }

  Update(){
    /*□Effect BulletBulr*/
    if(this.frame%1 == 0){
      let p = CPV(this.pos);
      let d = ADV(Rand2D(5),POV(this.frame,3))
      p = ADV(p,d);
      let v = POV(this.arg+Math.PI,4);
      let blur = new BulletBlur(p,v);
      EntityManager.addEntity(blur);
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
