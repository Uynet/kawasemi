import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Param from '../../param.js';
import Explosion2 from '../Effect/explosion2.js';

//敵の弾丸その1
export default class eBullet1 extends Enemy{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.frame = 0;
    this.type = "OTHERS"
    /*スプライト*/
    this.pattern = Art.enemyPattern.coin;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    let ENEMY3 = Param.ENEMY3;
    //this.addAI(new moveReflect(this));
    this.atkMax = ENEMY3.ATK_MAX;
    this.hp = ENEMY3.HP;
    this.gravity = ENEMY3.GRAVITY;
    this.coin = ENEMY3.COIN;
    /*フラグ*/
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  Animation(){
  //  this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }
  Die(){
    EntityManager.removeEntity(this);
  }

  Update(){
    /*
    for (let AI of this.AIList){
      AI.Do();
    }
    */
    this.Physics();
    this.Hurt();
    this.Animation();
    this.frame++;
    //observer
    if(this.hp<=0 || this.frame > 300){
      this.Die();
    }
  }
}