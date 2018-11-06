import Art from '../../art.js';
import Timer from "../../timer.js";
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Bullet4AI from '../AI/bullet4AI.js';
import Bullet from './bullet.js';
import Param from '../../param.js';

//normal bullet
export default class Bullet4 extends Bullet{
  constructor(pos,weapon){
    super(pos,fromPolar(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
  }
  Init(pos,weapon){
    /*基本情報*/
    this.name = "bullet4";
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.vel = fromPolar(this.arg,this.vi);
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy;
    /*スプライト*/
    this.BasicBulletInit();
    this.sprite.alpha = 0.8;
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.SetBoxCollider(4,4);
    this.AIList.push(new Bullet4AI(this));
    this.addAnimator(true,1,4);
    this.SetSize(this.size+Rand(8));
  }
  onAnimationEnd(){
    //nothing to do
  }
}
