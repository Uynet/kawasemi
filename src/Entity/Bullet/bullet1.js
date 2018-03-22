import Art from '../../art.js';
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Bullet1AI from '../AI/bullet1AI.js';
import Horming from '../AI/horming.js';
import Bullet from './bullet.js';
import BulletShot from '../Effect/bulletShot.js';
import BulletBlur from '../Effect/bulletBlur.js';
import Explosion1 from '../Effect/explosion1.js';
import Param from '../../param.js';

const bullet1 = Param.bullet1;

/*bullet1クラス*/
//Missile
export default class Bullet1 extends Bullet{
  constructor(pos,weapon){
    //super(pos,POV(weapon.arg,weapon.speed));
    super(VEC0(),VEC0());
  }
  Init(pos,weapon){
    /*基本情報*/
    this.frame = 0;
    this.name = "missile";
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
    this.atkMin = Param.bullet1.atkMin;//攻撃力
    this.atkMax = Param.bullet1.atkMax;//攻撃力
    this.curve = Param.bullet1.curve;
    this.AIList = [];
    this.AIList.push(new Bullet1AI(this));
    if(weapon.isHorming) this.AIList.push(new Horming(this));
  }

  Update(){
    /*□Effect BulletBulr*/
      let p = CPV(this.pos);
      let d = Rand2D(5);
      p = ADV(p,d);
      let v = POV(this.arg+Math.PI,4);
      let blur = Pool.GetBulletBlur(p,v);
      if(blur)EntityManager.addEntity(blur);
    /*Effect Sonic*/
    /*
    if(this.frame%4 == 0){
      let sonic = Pool.GetSonic(p,v);
      if(sonic)EntityManager.addEntity(sonic);
    }
    */
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 経過時間
    if(this.hp<=0){
      Pool.Remove(this);
      Audio.PlaySE("missileHit",1);
      EventManager.eventList.push(new QuakeEvent(6,3));//ゆれ
      EntityManager.addEntity(new Explosion1(CPV(this.pos)));
    }
    if(this.frame > 100){
      Pool.Remove(this);
      EntityManager.addEntity(new BulletShot(CPV(this.pos)));
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = this.arg + Math.PI/2;
    this.sprite.texture = this.pattern[this.spid];

    this.spid = (this.spid+1)%4;
    this.frame++;
  }
}
