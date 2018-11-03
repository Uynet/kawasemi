import Enemy from './enemy.js';
import Art from '../../art.js';
import Collision from '../../Collision/collision.js';
import EntityManager from '../../Stage/entityManager.js';
//import Enemy4AI from '../AI/enemy4AI.js';
import Enemy5AI from '../AI/enemy5AI.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Param from '../../param.js';

let EntityList = EntityManager.entityList;

export default class Enemy4 extends Enemy{
  constructor(pos){
    super(pos,vec0());
    this.name = "enemy4";
    this.BasicEnemyInit();
    /*スプライト*/
    this.addAI(new Enemy5AI(this,130));
    /*フラグ*/
    this.isActive = false;
  }
  OnCollisionWall(c,w){
    /* 衝突応答*/
    if(c.n.x != 0) this.vel.x = 0;
    //地面との衝突
    if(c.n.y == -1){ 
      this.isJump = false;
      this.vel.y = Math.min(0,this.vel.y * -0.3);
      this.vel.x *= 0.8;//摩擦
    }
    //天井との衝突
    if(c.n.y == 1 ){
      this.vel.y = Math.max(0,this.vel.y * -0.3)
    }
    /*押し出し*/
    this.pos.x += c.n.x * c.depth;
    this.pos.y += c.n.y * c.depth;
    /*note : now isHit == false*/
  }
  OnCollision(c,entity){
    if(entity.type == ENTITY.ENEMY)this.OnCollisionEnemy(c,entity);
    else if(entity.type == ENTITY.WALL)this.OnCollisionWall(c,entity);
  }
  OnCollisionEnemy(c,enemy){
    /* 衝突応答*/

    /*速度*/
    if(c.n.x != 0) this.vel.x = 0;
    //地面との衝突
    if(c.n.y == -1){ 
      this.floor.on = true; 
      this.floor.under = enemy
      this.isJump = false;
      this.vel.y = Math.min(0,this.vel.y * -0.3);
    }
    //天井との衝突
    if(c.n.y == 1 ){
      this.vel.y = Math.max(1,this.vel.y * -0.3)
    }
    /*押し出し*/
    this.pos.x += c.n.x * c.depth/2;
    this.pos.y += c.n.y * c.depth/2;
    /*note : now isHit == false*/
  }
  Animation(){
    //this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
  }

  Update(){
    this.ExecuteAI();

    this.Collision();
    this.Hurt();
    this.Animation();

    if(this.isActive){
      this.spid = 1;
      //たまにじゃんぷ　
      if(this.frame%40 == 0 && !this.isJump){
        this.vel.y = -3;
        this.vel.x = (EntityManager.player.pos.x - this.pos.x > 0)?0.7:-0.7;
        this.isJump = true;
      }
    }else{
      this.spid = 0;
      this.frame = 0;
    }
    //this.Physics();
    this.vel.y = Math.min(this.vel.y,4.8);
    this.force.x *= 0.9;
    this.force.y *= 0.9;
  }
}
