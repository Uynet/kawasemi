import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import EventManager from '../Event/eventmanager.js';
import QuakeEvent from '../Event/quakeEvent.js';
import Bullet2AI from './AI/bullet2AI.js';
import Bullet from './bullet.js';
import BulletBlur from './Effect/bulletBlur.js';
import Util from '../util.js';
import Explosion1 from './Effect/explosion1.js';
import Param from '../param.js';

const bullet2 = Param.bullet2;

//Laser
export default class Bullet2 extends Bullet{
  constructor(pos,arg,weapon){
    super(pos,POV(arg,VEC0()));
    /*基本情報*/
    this.frame = 0;
    this.arg = arg;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
      this.isUpdater  =true;
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet2;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = Param.bullet2.hp;//弾丸のHP 0になると消滅
    this.atk = Param.bullet2.atkMax;//攻撃力
    this.curve = Param.bullet2.curve;
    //this.boost = 1.5;
    this.type = ENTITY.BULLET;
    /*AI*/
    this.AIList = [];
    this.AIList.push(new Bullet2AI(this));
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 経過時間
    if( this.frame > 10) {
      EntityManager.removeEntity(this);
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.position.x -=4;
    this.sprite.rotation = this.arg;
    this.sprite.texture = this.pattern[this.spid];

    this.spid = (this.spid+1)%8;
    this.frame++;
  }
}
