import Enemy from './Enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Enemy2AI from '../AI/enemy2AI.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Coin from '../coin.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Util from '../../util.js';
import Param from '../../param.js';

let ENEMY2 = {
  HP : 5,
  ATK_MAX : 10,
  ATK_MIN : 5,
  GRAVITY : 0.1,
  COIN : 3
}

let EntityList = EntityManager.entityList;

export default class Enemy2 extends Enemy{
  constructor(pos){
    super(pos,VEC0(),VEC0());
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.frame = 0;
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy2;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    ENEMY2 = Param.ENEMY2;
    this.addAI(new Enemy2AI(this));
    this.atkMax = ENEMY2.ATK_MAX;
    this.hp = ENEMY2.HP;
    this.gravity = ENEMY2.GRAVITY;
    this.coin = ENEMY2.COIN;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  //die
  Die(){
    this.isAlive = false;
      //死ぬ時にコイン
      for(let i = 0;i<this.coin;i++){
        EntityManager.addEntity(new Coin({x:this.pos.x,y:this.pos.y}));
      }
      //EventManager.eventList.push(new QuakeEvent(5));//ゆれ
      EntityManager.removeEntity(this);
  }
  //自分がダメージを食らう
  Damage(atkMax){
    this.hp += atkMax;
    //ダメージをポップ
    EntityManager.addEntity(new FontEffect(this.pos,-atkMax+"","enemy"));
  }
  Collision(){
    /*衝突判定*/
    for(let l of EntityManager.wallList){
      if(l == this) continue;
      /*衝突判定*/
      let c = Collision.on(this,l);
      if(c.isHit){
        /* 衝突応答*/

        /*速度*/
        if(c.n.x != 0) {
          this.vel.x = 0;
        }
        //地面との衝突
        if(c.n.y == -1){ 
          this.isJump = false;
          this.vel.y = Math.min(0,this.vel.y * -0.3);
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
    // 敵同士の衝突
    this.floor.on  =false ;
    this.floor.under = null;
    for(let i=0;i<EntityManager.enemyList.length;i++){
      let l = EntityManager.enemyList[i];
      let c = Collision.on(this,l);
      //これないと自分と衝突判定してバグ
      if(i == EntityManager.enemyList.indexOf(this))continue;
      //衝突判定
      if(c.isHit){
        // 衝突応答

        //速度
        if(c.n.x != 0) this.vel.x *= -1;
        //地面との衝突
        if(c.n.y == -1){ 
          this.floor.on = true;
          this.floor.under = EntityManager.enemyList[i];
          this.isJump = false;
          this.vel.y = Math.min(1,this.vel.y * -0.3);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.max(1,this.vel.y * -0.3)
        }
        //押し出し
        let l = EntityManager.enemyList[i];
        this.pos.x += c.n.x * c.depth/2;
        this.pos.y += c.n.y * c.depth/2;
        //note : now isHit == false
      }
    }
  }
  //プレイヤーにダメージを与える
  Hurt(){
    let player = EntityManager.player; 
    let c = Collision.on(this,player);
    if(c.isHit && c.n.y != 1){
      //ダメージ
      let damage = this.atkMax  +  Math.floor(-this.vel.y * Math.random());
      EntityManager.player.Damage(-damage);
    }
  }


  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.acc.y = 0;
    this.acc.x = 0;
    //最大速度制限
    this.vel.y = Math.max(Math.min(this.vel.y,0.05),-0.05);
  }
  Animation(){
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
    this.frame++;
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do(this);
    }
    this.Collision();
    this.Physics();
    this.Hurt();
    this.Animation();//アニメーション
    this.frame++;

    //observer
    if(this.hp<=0){
      this.Die();
    }
  }
}
