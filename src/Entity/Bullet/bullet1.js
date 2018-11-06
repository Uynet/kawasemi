import Animator from "../AI/animator.js";
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import Bullet1AI from '../AI/bullet1AI.js';
import Horming from '../AI/horming.js';
import Bullet from './bullet.js';
import EmitTrail from "../AI/emitTrail.js";
import BulletShot from '../Effect/bulletShot.js';
import BulletTrail from '../Effect/bulletTrail.js';

/*bullet1クラス*/
//Missile
export default class Bullet1 extends Bullet{
  constructor(pos,weapon){
    super(pos,fromPolar(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
    /*コライダ*/
    this.SetBoxCollider(4,4);
    /*パラメータ*/
    this.addAnimator(true,1,4);
    this.AIList.push(new Bullet1AI(this));
    this.AIList.push(new EmitTrail(this,BulletTrail,1));
    if(weapon.isHorming) this.AIList.push(new Horming(this));
  }
  Init(pos,weapon){
    /*基本情報*/
    this.name = "bullet1";
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    /*スプライト*/
    this.BasicBulletInit();
  }
}
