import Art from '../../art.js';
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from '../../Event/eventmanager.js';
import Bullet3AI from '../AI/bullet3AI.js';
import Horming from '../AI/horming.js';
import Bullet from './bullet.js';
import BulletBlur2 from '../Effect/bulletBlur2.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Param from '../../param.js';

//normal bullet
export default class Bullet3 extends Bullet{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
  }
  Init(pos,weapon){
    /*基本情報*/
    this.frame = 0;
    this.name = "normal";
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet3;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.sprite.anchor.set(0.5);
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,4,4));//衝突判定の形状
    /*パラメータ*/
    this.hp = Param.bullet3.hp;//弾丸のHP 0になると消滅
    this.atkMin = Param.bullet3.atkMin;//攻撃力
    this.atkMax = Param.bullet3.atkMax;//攻撃力
    //this.curve = Param.bullet3.curve;
    this.AIList = [];
    this.AIList.push(new Bullet3AI(this));
    //if(weapon.isHorming) this.AIList.push(new Horming(this));
  }

  Update(){
    /*□Effect BulletBulr*/
    if(this.frame%2 == 0){
      let p = CPV(this.pos);
      let d = Rand2D(5);
      p = ADV(p,d);
      let v = POV(this.arg+Math.PI,4);
      let blur = new BulletBlur2(p,v);
      if(blur)EntityManager.addEntity(blur);
    }
    for (let AI of this.AIList){
      AI.Do();
    }
    /*observer*/
    //HP || 経過時間
    if(this.hp<=0 ||
      this.frame > 30) {
      EntityManager.removeEntity(this);
      EntityManager.addEntity(new BulletHitWall(CPV(this.pos)));
    }
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = this.arg + Math.PI/2;
    this.sprite.texture = this.pattern[this.spid];

    this.spid = (this.spid+0)%4;
    this.frame++;
  }
}
