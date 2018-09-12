import Enemy from './enemy.js';
import Enemy2 from './enemy2.js';
import Enemy4 from './enemy4.js';
import Coin from "../Mover/coin.js";
import Audio from "../../audio.js";
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Enemy1AI from '../AI/enemy1AI.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Param from '../../param.js';


let EntityList = EntityManager.entityList;

export default class Enemy1 extends Enemy{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.size = 96;
    this.collider = new Collider(SHAPE.BOX,new Box(pos,this.size,this.size));//衝突判定の形状
    this.type = ENTITY.ENEMY;
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy1;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.scale.set(6);
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new Enemy1AI(this));
    this.SetParam(Param.enemy1);
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.isPop = false;
    this.isWait = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
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
        if(c.n.y == -1 && this.vel.y>0){ 
          if(this.isJump == true){
            let p = {
              x : this.pos.x + this.size/2,
              y : 0,
            }
            let enemyPop = 3;
            if(this.hp<2000){
              enemyPop = 7;
            }
            if(this.hp<1000){
              enemyPop = 10;
            }
            for(let i = 0;i<enemyPop;i++){
              EntityManager.addEntity(new Enemy4(ADV(p,Rand2D(10*enemyPop))));
            }
            //着地
            //なおす
            this.AIList[0].Landing();
            this.isJump = false;
            this.isPop = true;//余韻状態へ
          }
          //余韻状態
          if(this.isPop){
            Audio.PlaySE("landing2",3);
            this.vel.y = Math.min(0,this.vel.y * -0.4);
            this.vel.x *= 0.4;
            if(this.vel.y>-0.05 ){
              this.isPop = false;
              this.isWait = true;
            }
          }
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
    this.CollisionEnemy();
  }
  CollisionEnemy(){
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
          EntityManager.enemyList[i].Damage(-99);
        }
        /*note : now isHit == false*/
      }
    }
  }
  //プレイヤーにダメージ
  Hurt(){
    let player = EntityManager.player; 
    let c = Collision.on(this,player);
    //
    //潰されたときだけ
    if(c.isHit && c.n.y == -1){
      //ダメージ
      let damage = RandBET(this.atkMin,this.atkMax);
      if(!player.isInvincible)player.Damage(-damage);
      //自分もダメージ
    //  this.Damage(-1);
    }
    if(c.isHit && c.n.y != 1){
      player.vel.x = -c.n.x*10;
      if(!player.isInvincible)player.Damage(-10);
    }
  }
  Animation(){
    this.spid = Math.floor(this.frame/6)%4;
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
    //アニメーション
    this.Animation();
    //observer
    if(this.hp<=0){
      this.Die();
    }
    this.frame++;
  }
}
