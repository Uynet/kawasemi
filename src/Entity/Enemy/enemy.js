import Entity from '../entity.js';
import Collider from "../../Collision/collider.js";
import Box from "../../Collision/box.js";
import Param from "../../param.js";
import Art from "../../art.js";
import Audio from '../../audio.js';
import EntityManager from '../../Stage/entityManager.js';
import EventManager from "../../Event/eventmanager.js";
import QuakeEvent from "../../Event/quakeEvent.js";
import FontEffect from '../Effect/fontEffect.js';
import Collision from '../../Collision/collision.js';
import Coin from '../Mover/coin.js'
import Explosion2 from '../Effect/Explosion/explosion2.js';
import Explosion3 from '../Effect/Explosion/explosion3.js';
import BasicAI from "../AI/basicAI.js";
import BasicEnemyPhysics from "../AI/basicEnemyPhysics.js";

export default class Enemy extends Entity{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.size = 16;
    this.type = ENTITY.ENEMY;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.isUpdater = true;
    this.colType = "through";
    this.material = "wall";
    this.isBreakable = true;
    /*固有情報*/
    this.AIList = [];//AIの配列
    /*レイヤー*/
    this.layer = "ENTITY";
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
    this.force = vec0();
    this.addAI(new BasicAI(this));
    this.addAI(new BasicEnemyPhysics(this));
  }
  BasicEnemyInit(){
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(this.pos,16,16));
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.SetParam(Param[this.name]);
    /*スプライト*/
    this.pattern = Art.enemyPattern[this.name];
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    this.e = 0;
  };
  //自分がダメージを食らう
  Damage(atk){
    Audio.PlaySE("enemyDamage",-0.7);
    this.hp += atk;
    //ダメージをポップ
    EntityManager.addEntity(new FontEffect(this.pos,-atk+"","enemy"));
  }
  //プレイヤーにダメージを与える
  Hurt(){
    let player = EntityManager.player; 
    let c = Collision.on(this,player);
    if(c.isHit && c.n.y != 1){
      //ダメージ
      let damage = RandBET(this.atkMin,this.atkMax);
      if(!player.isInvincible)player.Damage(-damage);
    }
    //プレイヤーに衝突応答
  }
  OnDying(){
    this.Die();
  }
  //しぬ
  Die(){
    this.isAlive = false;
      //死ぬ時にコイン
      for(let i = 0;i<this.coin;i++){
        EntityManager.addEntity(new Coin({x:this.pos.x,y:this.pos.y}));
      }
      EventManager.eventList.push(new QuakeEvent(15,0.4));//ゆれ
      EntityManager.removeEntity(this);
      EntityManager.addEntity(new Explosion3(this.pos));
  }
  //衝突判定
  Collision(){
    let list = EntityManager.colliderList;
    for(let i =0;i<list.length;i++){
      let l = list[i];
      if(l == this) continue;
      let c = Collision.on(this,l);
      if(c.isHit) this.OnCollision(c,l);
    }
  }
  EnemyPhysics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    if(this.gravity)this.acc.y += this.gravity;
    this.BasicPhysics();
    //最大速度制限
  }
  SetParam(param){
    Object.keys(param).forEach(key=>{
      this[key]=param[key];
    })
  }
}
