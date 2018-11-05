import Art from '../../art.js';
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import Bullettrail2 from '../Effect/bullettrail2.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from '../../Event/eventmanager.js';
import Bullet3AI from '../AI/bullet3AI.js';
import Horming from '../AI/horming.js';
import Bullet from './bullet.js';
import EmitTrail from "../AI/emitTrail.js";

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
    this.AIList.push(new EmitTrail(this,Bullettrail2,EMIT_TERM));
    //if(weapon.isHorming) this.AIList.push(new Horming(this));
  }
}
