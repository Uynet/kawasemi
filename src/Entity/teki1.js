import Mover from './mover.js';
import Enemy from './enemy.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import TestAI from './AI/testAI.js';
import UIManager from '../UI/uiManager.js'
import Timer from '../timer.js';

const ATK_TEKI1 = 1;

let EntityList = EntityManager.entityList;

export default class Teki1 extends Enemy{
  constructor(pos){
    super(pos,{x:0,y:0},{x:0,y:0});
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.frame = 0;
    /*スプライト*/
    this.pattern = Art.enemyPattern;
    this.spid = 0; // spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new TestAI(this));
    this.atk = ATK_TEKI1;
    this.hp = 10;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
  }
  Collision(){
    /*衝突判定*/
    /*TODO 敵が潰された時にめり込むのでなんとかする*/
    for(let l of EntityManager.wallList.concat(EntityManager.enemyList)){
      if(l == this) continue;
      /*衝突判定*/
      if(Collision.on(this,l).isHit){
        /* 衝突応答*/

        /*速度*/
        if(Collision.on(this,l).n.x != 0) this.vel.x = 0;
        if(Collision.on(this,l).n.y != 0) {
          this.isJump = false;
          this.vel.y *= -0.3;
        }
        /*押し出し*/
          let c = Collision.on(this,l)
          this.pos.x += c.n.x * c.depth;
          this.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
  }
  Hurt(){
    if(Collision.on(this,EntityManager.player).isHit){
      let damage = this.atk + Math.floor(10 * Math.random());
      EntityManager.player.Damage(-damage);
    }
  }


  Physics(){
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  Update(){
    this.Collision();
    this.Hurt();
    for (let AI of this.AIList){
      AI.Do();
    }
    this.Physics();
    this.sprite.position = this.pos;
    //アニメーション
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.frame++;
  }
}
