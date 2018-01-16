import Mover from './mover.js';
import Enemy from './enemy.js';
import Art from '../art.js';
import CollisionShape from '../Collision/collisionShape.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import TestAI from './AI/testAI.js';

const ATK_TEKI1 = 1;

export default class Teki1 extends Enemy{
  constructor(pos){
    super(pos,{x:0,y:0},{x:0,y:0});
    this.sprite = Art.SpriteFactory(Art.teki3Texture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.addAI(new TestAI(this));
    this.atk = ATK_TEKI1;
  }
  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    let EntityList = EntityManager.entityList;

    for(let l of EntityList){
      switch(l.type){
        case ENTITY.PLAYER :
          /*衝突判定*/
          if(Collision.on(this,l).isHit){
            l.hp-=this.atk;
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
    for (let AI of this.AIList){
      AI.Do();
    }
    this.UpdatePosition();
    this.sprite.position = this.pos;

    /*observer*/
    if(this.hp<=0){
      this.hp = 1;
      EntityManager.removeEntity(this);
    }
  }
}
