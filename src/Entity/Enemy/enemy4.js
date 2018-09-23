import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
//import Enemy4AI from '../AI/enemy4AI.js';
import Enemy5AI from '../AI/enemy5AI.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Param from '../../param.js';

let EntityList = EntityManager.entityList;

export default class Enemy4 extends Enemy{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy4;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new Enemy5AI(this,130));
    this.SetParam(Param.enemy4)
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.isActive = false;
  }
  //衝突判定
  Collision(){
    for(let l of EntityManager.wallList){
      if(l == this) continue;
      let c = Collision.on(this,l);
      if(c.isHit){
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
    }
    this.floor.on = false;
    this.floor.under = null;
    for(let i=0;i<EntityManager.enemyList.length;i++){
      let l = EntityManager.enemyList[i];
      let c = Collision.on(this,l);
      //これないと自分と衝突判定してバグ
      if(i == EntityManager.enemyList.indexOf(this))continue;
      /*衝突判定*/
      if(c.isHit){
        /* 衝突応答*/

        /*速度*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
          this.floor.on = true; 
          this.floor.under = EntityManager.enemyList[i];
          this.isJump = false;
          this.vel.y = Math.min(0,this.vel.y * -0.3);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.max(1,this.vel.y * -0.3)
        }
        /*押し出し*/
        let l = EntityManager.enemyList[i];
        this.pos.x += c.n.x * c.depth/2;
        this.pos.y += c.n.y * c.depth/2;
        /*note : now isHit == false*/
      }
    }
  }
  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    if(this.gravity)this.acc.y += this.gravity;
    this.vel.y = Math.min(this.vel.y,2.8);

    this.acc.x += this.force.x;
    this.acc.y += this.force.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.acc.y = 0;
    this.acc.x = 0;
    this.force.x *= 0.9;
    this.force.y *= 0.9;
    //最大速度制限
  }
  Animation(){
    //this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do();
    }


    this.Collision();
    this.Physics();
    this.Hurt();
    this.Animation();

    if(this.isActive){
      this.spid = 1;
      if(!this.isJump){
        this.vel.x *= 0.7;
      }
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

    //observer
    if(this.hp<=0){
      this.Die();
    }
    this.frame++;
  }
}
