import Mover from './mover.js';
import Enemy from './enemy.js';
import Art from '../art.js';
import CollisionShape from '../Collision/collisionShape.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import TestAI from './AI/testAI.js';
import Util from '../util.js';

export default class Bullet extends Enemy{
  constructor(pos,vel,tex){
    super(pos,vel,{x:0,y:0});
    /*スプライト*/
    this.sprite = Art.SpriteFactory(tex);
    this.sprite.position = pos;
    /*コライダ*/
    this.collisionShape = new CollisionShape(
      SHAPE.BOX,
      new Box(pos,16,16)
    );
    /*パラメータ*/
    this.hp = 1;//弾丸のHP 0になると消滅
    this.atk = 1;//攻撃力
    this.length = 80;//これは武器がもつ?
    this.launchedPos = {x:pos.x,y:pos.y};//射出された座標 射程距離の計算に必要 
    this.type = ENTITY.BULLET;
  }
  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    let EntityList = EntityManager.entityList;

    for(let l of EntityList){
      switch(l.type){
        case ENTITY.ENEMY :
          /*衝突判定*/
          if(Collision.on(this,l).isHit){
            l.hp-=this.atk;
            this.hp = 0;
          }
          break;
        case ENTITY.WALL :
          /*衝突判定*/
          if(Collision.on(this,l).isHit){
            l.hp-=this.atk;
            this.hp = 0;
          }
          break;
      }
    }
  }

  Phisics(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  Update(){
    this.collision();
    /*
    for (let AI of this.AIList){
      AI.Do();
    }
    */
    this.Phisics();
    this.sprite.position = this.pos;

    /*observer*/
    if(this.hp<=0){
      EntityManager.removeEntity(this);
    }
    //飛行距離判定
    if(Util.distance(this.pos , this.launchedPos) > this.length){
      EntityManager.removeEntity(this);
    }
  }
}
