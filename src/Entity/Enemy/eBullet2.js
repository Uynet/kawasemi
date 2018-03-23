import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';
import Param from '../../param.js';
import Explosion2 from '../Effect/explosion2.js';
import Stone from '../Effect/stone.js';
import MoveReflect from '../AI/moveReflect.js';

//敵の弾丸その2
export default class eBullet2 extends Enemy{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,8,8));//衝突判定の形状
    this.frame = 0;
    this.type = "MOVER"
    /*スプライト*/
    this.pattern = Art.enemyPattern.eBullet2;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.param = Param.eBullet2;
    //this.addAI(new MoveReflect(this));
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = this.param.gravity;
    /*フラグ*/
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  Animation(){
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }
  Die(){
    EntityManager.removeEntity(this);
    EntityManager.addEntity(new Explosion2(CPV(this.pos),1.5*Math.PI))
  }
  Collision(){
    for(let w of EntityManager.wallList){
      let c = Collision.on(this,w);
      //判定は落下中のみ
      if(c.isHit && this.vel.y >2){
        this.hp--;
      }
    }
  }

  Update(){
    //for (let AI of this.AIList){
    // AI.Do();
    //}
   if(this.frame%1 == 0){
    let stone = Pool.GetStone(ADV(this.pos,VECX(4)),VEC0());
    if(stone)EntityManager.addEntity(stone);
    }
    this.Physics();
    if(Math.abs(this.vel.y)>1)this.vel.y *= 1;
    this.Collision();
    this.Hurt();
    this.Animation();
    this.frame++;
    //observer
    if(this.hp<=0 || this.frame > 300){
      this.Die();
    }
  }
}
