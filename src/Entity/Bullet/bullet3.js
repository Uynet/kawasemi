import Art from '../../art.js';
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import BulletTrail2 from '../Effect/bulletTrail2.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from '../../Event/eventmanager.js';
import Bullet3AI from '../AI/bullet3AI.js';
import Horming from '../AI/horming.js';
import Bullet from './bullet.js';
import EmitTrail from "../AI/emitTrail.js";
import BulletHitWall from '../Effect/bulletHitWall.js';

const EMIT_TERM = 2;

//normal bullet
export default class Bullet3 extends Bullet{
  constructor(pos,weapon){
    super(pos,fromPolar(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
  }
  Init(pos,weapon){
    /*基本情報*/
    this.name = "bullet3";
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    this.BasicBulletInit();
    this.SetBoxCollider(4,4);
    this.AIList.push(new Bullet3AI(this));
    this.AIList.push(new EmitTrail(this,BulletTrail2,EMIT_TERM));
    this.addBasic();
    //if(weapon.isHorming) this.AIList.push(new Horming(this));
  }
  OnCollision(entity){
    if(entity.type == ENTITY.ENEMY)this.OnCollisionEnemy(entity);
    else if(entity.type == ENTITY.WALL)this.OnCollisionWall(entity);
  }
  OnCollisionEnemy(enemy){
    enemy.Damage(-RandomRange(this.atkMin,this.atkMax));
    this.hp--;
  }
  OnCollisionWall(wall){
    if(wall.isBreakable)wall.Damage(-RandomRange(this.atkMin,this.atkMax));
    switch(wall.material){
      case  "wall" : Audio.PlaySE("landing1",-1,2);break;
      case  "steel": Audio.PlaySE("landing3",4,2);break;
    }
    this.hp = 0;
  }
  OnDying(){
    this.Delete();
    let effect = new BulletHitWall(copy(this.pos));
    effect.addEntity();
  }
}
