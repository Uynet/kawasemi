import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Enemy2AI from '../AI/enemy2AI.js';
import Shot from '../AI/shot.js';
import MoveLissajous from '../AI/moveLissajous.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Param from '../../param.js';
import Explosion2 from '../Effect/explosion2.js';

let STATE = {
  WAITING : "WAITING",
  ACTIVE : "ACTIVE",
}

export default class Enemy3 extends Enemy{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.arg = 0;
    this.frame = 0;
    this.frameShot = 0;//最後にshotした時刻
      this.e = 0;
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy3;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = ADV(this.pos , VECN(8));
    this.sprite.anchor.set(0.5);
    /*パラメータ*/
    this.param = Param.enemy3;
    this.addAI(new Shot(this));
    this.addAI(new MoveLissajous(this));
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.range = this.param.range;
    this.coin = this.param.coin;
    /*state*/
    this.state = "WAITING";
    /*フラグ*/
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  Animation(){
  //  this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = ADV(this.pos , VECN(8));
  }
  Collision(){
    for(let w of EntityManager.wallList){
      let c = Collision.on(this,w);
      if(c.isHit){
        Collision.Resolve(this,w);
      }
    }
  }

  Update(){
    //if(DIST(this.pos,EntityManager.player.pos) < this.range){
    if(EntityManager.player.weapon.isSeen(EntityManager.player,this)){
      //if(EntityManager.player.weapon.target.enemy == this){
        this.state = "ACTIVE";
      //}else{
       // this.state = "WAITING"
      //}
    }else{
      this.state = "WAITING";
    }
    switch(this.state){
      case "WAITING" :
        this.sprite.scale.set(1);
        this.sprite.rotation = 0; 
        this.spid = 0;
        this.vel = VEC0();
        break;
      case "ACTIVE" :
        this.sprite.rotation += 0.1;
        this.sprite.scale.set(1 + Math.cos(this.frame/2)/5);
        this.spid = 1
        this.AIList[0].Do();
        this.AIList[1].Do();
        break;
      default :
        console.warn(this.state);
    }

    this.Physics();
    this.Collision();
    this.Hurt();
    this.Animation();
    this.frame++;
    //observer
    if(this.hp<=0){
      this.Die();
    }
    this.arg = Math.atan((EntityManager.player.pos.y-this.pos.y)/(EntityManager.player.pos.x-this.pos.x));
    if(this.pos.x > EntityManager.player.pos.x ) this.arg += Math.PI;
  }
}
