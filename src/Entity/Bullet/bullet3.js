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
import Param from '../../param.js';
import EmitTrail from "../AI/emitTrail.js";

//normal bullet
export default class Bullet3 extends Bullet{
  constructor(pos,weapon){
    super(pos,POV(weapon.arg,weapon.speed));
    this.Init(pos,weapon);
  }
  SetParam(){
    this.hp = Param.bullet3.hp;//弾丸のHP 0になると消滅
    this.atkMin = Param.bullet3.atkMin;//攻撃力
    this.atkMax = Param.bullet3.atkMax;//攻撃力
    this.deleteFrameCount = Param.bullet3.deleteFrameCount;//残存時間
    //this.curve = Param.bullet3.curve;
  }
  Init(pos,weapon){
    /*基本情報*/
    this.frame = 0;
    this.name = "normal";
    this.isUpdater = true;
    this.arg = weapon.arg;
    this.vi = weapon.speed;
    this.isTargetOn = weapon.isTargetOn;
    if(this.isTargetOn) this.targetedEnemy = weapon.target.enemy
    /*スプライト*/
    this.pattern = Art.bulletPattern.bullet3;
    this.SetSprite();
    this.collider = new Collider(SHAPE.BOX,new Box(pos,4,4));//衝突判定の形状
    this.SetParam();
    let emitTerm = 2;
    this.AIList.push(new Bullet3AI(this));
    this.AIList.push(new EmitTrail(this,Bullettrail2,emitTerm));
    //if(weapon.isHorming) this.AIList.push(new Horming(this));
  }
}
