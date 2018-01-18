import Mover from './mover.js';
import Enemy from './enemy.js';
import Art from '../art.js';
import CollisionShape from '../Collision/collisionShape.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import TestAI from './AI/testAI.js';

export default class Bullet extends Enemy{
  constructor(pos,vel,tex){
    super(pos,vel,{x:0,y:0});
    /*もどす*/
    this.sprite = Art.SpriteFactory(tex);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.hp = 1;
    this.atk = 1;
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
            //let bullet = new Bullet({x:this.pos.x, y:this.pos.y},{x:-this.vel.x,y:0});
            //EntityManager.addEntity(bullet);
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

  UpdatePosition(){
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
    this.UpdatePosition();
    this.sprite.position = this.pos;

    /*observer*/
    if(this.hp<=0){
      this.hp = 1;
      EntityManager.removeEntity(this);
    }
  }
}
