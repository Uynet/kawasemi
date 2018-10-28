import Art from '../../art.js';
import Animator from "../AI/animator.js";
import Timer from "../../timer.js";
import Drawer from "../../drawer.js";
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from '../../Event/eventmanager.js';
import Bullet4AI from '../AI/bullet4AI.js';
import Horming from '../AI/horming.js';
import Bullet from './bullet.js';
import BulletTrail2 from '../Effect/bulletTrail2.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Param from '../../param.js';

//normal bullet
export default class Bullet4 extends Bullet{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
  }
 SetParam(){
    this.hp = Param.bullet4.hp;//弾丸のHP 0になると消滅
    this.atkMin = Param.bullet4.atkMin;//攻撃力
    this.atkMax = Param.bullet4.atkMax;//攻撃力
    //this.curve = Param.bullet3.curve;
  }
  Init(pos,weapon){
    /*基本情報*/
    this.frame = 0;
    this.name = "weapon4";//これはどこで使われてる?
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.vel = POV(this.arg,this.vi);
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = Art.bulletPattern.buringFire;
    this.SetSprite();
    this.sprite.alpha = 0.8;
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.collider = new Collider(SHAPE.BOX,new Box(pos,4,4));
    this.SetParam();
    this.AIList.push(new Bullet4AI(this));
    this.AIList.push(new Animator(this,false,1,4));
    this.SetSize(this.size+Rand(8));
  }
}
