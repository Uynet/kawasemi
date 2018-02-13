import Enemy from './enemy.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import UIManager from '../UI/uiManager.js'
import Timer from '../timer.js';
import FontEffect from './Effect/fontEffect.js';
let EntityList = EntityManager.entityList;

//壊せる木箱
export default class WoodBox extends Enemy{
  constructor(pos){
    super(pos,{x:0,y:0},{x:0,y:0});
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    /*スプライト*/
    this.pattern = Art.enemyPattern.woodbox;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.hp = 10;
    /*フラグ*/
    this.isAlive = true;
  }
  //自分がダメージを食らう
  Damage(atkMax){
    this.hp += atkMax;
  }
  Collision(){
    /*衝突判定*/
    /*TODO 敵が潰された時にめり込むのでなんとかする*/
    for(let l of EntityManager.wallList){
      if(l == this) continue;
      /*衝突判定*/
      let c = Collision.on(this,l);
      if(c.isHit){
        /* 衝突応答*/

        /*速度*/
        if(c.n.x != 0) this.vel.x = 0;
        if(c.n.y != 0) {
          this.isJump = false;
          this.vel.y *= -0.3;
        }
        /*押し出し*/
        this.pos.x += c.n.x * c.depth;
        this.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
    for(let l of EntityManager.enemyList){
      //これないと自分と衝突判定してバグ
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
        let c = Collision.on(this,l);
        this.pos.x += c.n.x * c.depth/2;
        this.pos.y += c.n.y * c.depth/2;
        /*note : now isHit == false*/
      }
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
    this.Physics();
    this.sprite.position = this.pos;
  }
}
