import Enemy from './enemy.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Enemy2 from './enemy2.js';
import Enemy4 from './enemy4.js';
import Explosion1 from "../Effect/explosion1.js";
import Explosion2 from "../Effect/explosion2.js";
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
import StartBossBattleEvent from "../../Event/StartBossBattleEvent.js";


let EntityList = EntityManager.entityList;

//enum
const State = {
  INIT : "INIT",
  WAIT : "WAIT",
  JUMP : "JUMP",
  POP : "POP",
}

export default class Enemy1 extends Enemy{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.size = 96+16;
    this.collider = new Collider(SHAPE.BOX,new Box(pos,this.size,this.size));//衝突判定の形状
    this.type = ENTITY.ENEMY;
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy1;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.scale.set(this.size/16);
    this.sprite.position = this.pos;
    /*パラメータ*/
    //this.addAI(new Enemy1AI(this));
    this.SetParam(Param.enemy1);
    /*フラグ*/
    this.state = State.INIT;
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  SetSize(size){
    this.size = size;
    this.sprite.scale.set(this.size/16);
    this.collider = new Collider(SHAPE.BOX,new Box(this.pos,this.size,this.size));//衝突判定の形状
  }
  Initing(){
    this.state = "POP";
    this.Landing();
    let e = new StartBossBattleEvent("boss");
    EventManager.PushEvent(e);
  }
  Waiting(){
    //たまにジャンプする
    if(this.frame % 100 == 19){

      EventManager.PushEvent(new QuakeEvent(10,0.99));
      this.vel.y = -0.2;
      this.acc.y = -2.3;
      this.state = "JUMP";
      let p = ADV(this.pos,VEC2(-20,90));
    //  Audio.PlaySE("enemy5Shot");
    Audio.PlaySE("landing2",1.6);
    }
  }
  Poping(){
    Audio.PlaySE("landing2",3);
    this.vel.y = Math.min(0,this.vel.y * -0.4);
    this.vel.x *= 0.4;
    if(this.vel.y>-0.05 ){
      this.state = "WAIT";
    }
  }
  Landing(){
    let p = CPV(this.pos);
    p.y += this.size;
    this.acc.x = 0;
    EventManager.PushEvent(new QuakeEvent(40,0.97));
    Audio.PlaySE("missileHit",2);
    for(let i = 0;i<4;i++){
      EntityManager.addEntity(new Explosion1(p));
      p.x += this.size/4;
    }
  }
  Jumping(){
    let p = {
      x : this.pos.x + this.size/2,
      y : 0,
    }
    let enemyPop = 5;
    if(this.hp<2000){
      enemyPop = 7;
    }
    if(this.hp<1000){
      enemyPop = 10;
    }
    for(let i = 0;i<enemyPop;i++){
      let e = new Enemy4(ADV(p,Rand2D(10*enemyPop)));
      //ちょっと特殊
      e.AIList[0].dist = 1000;
      e.coin = Dice(1)+1;
      EntityManager.addEntity(e);

    }
    //着地
    this.Landing();
    this.state = "POP"  
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
          switch(this.state){
            case "WAIT" : this.Waiting();break;
            case "JUMP" : this.Jumping();break;
            case "POP" : this.Poping();break;
            case "INIT" : this.Initing();break;//この名前何
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
//          EntityManager.enemyList[i].Damage(-99);
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
      //if(!player.isInvincible)player.Damage(-damage);
      //if(!player.isInvincible)player.Damage(-damage);
    }
    if(c.isHit && c.n.y != 1){
      player.vel.x = -c.n.x*10;
      if(!player.isInvincible)player.Damage(-10);
    }
    if(c.isHit && c.n.y == 1){
      //上に乗られたらダメージ
      //this.Damage(-1);
    }
  }
  Damage(atk){
    Audio.PlaySE("enemyDamage",-0.5);
    this.hp += atk;
    //ダメージをポップ
    EntityManager.addEntity(new FontEffect(this.pos,-atk+"","enemy"));
    //this.SetSize(this.size-(this.size-80))
  }
  Animation(){
    this.spid = Math.floor(this.frame/6)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Update(){
    //AI
    if(this.state == "JUMP"){
      this.acc.x = (this.pos.x+this.size/2 < EntityManager.player.pos.x)? 0.010 : -0.010;
      this.vel.x = Math.max(-1,Math.min(this.vel.x,1));
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
