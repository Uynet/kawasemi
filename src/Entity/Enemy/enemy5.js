import Enemy from './enemy.js';
import Art from '../../art.js';
import Audio from '../../audio.js'
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import moveReflect from '../AI/moveReflect.js';
import eBullet2 from '../../Entity/Enemy/eBullet2.js';
import Enemy5AI from '../AI/enemy5AI.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Param from '../../param.js';

export default class Enemy5 extends Enemy{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.frame = 0;
    this.type = ENTITY.ENEMY;
    this.dir = 1;
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy5;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.addAI(new Enemy5AI(this,200));
    this.addAI(new moveReflect(this));
    this.param = Param.enemy5;
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = 0 * this.param.gravity;
    this.coin = this.param.coin;
    this.term = this.param.term;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.isActive = false;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
    this.vel.x = -0.5;
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
      //判定は落下中のみ
      if(c.isHit){
        /* 衝突応答*/

        //壁との衝突
        if(c.n.x != 0) this.vel.x = 0;
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
        /*押し出し*/
        let l = EntityManager.enemyList[i];
        this.pos.x += c.n.x * c.depth/2;
        this.pos.y += c.n.y * c.depth/2;
        /*note : now isHit == false*/
      }
    }
  }
  Animation(){
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Update(){
    /*AI*/
    for (let AI of this.AIList){
      AI.Do();//activationのみ
    }
    //this.isActive = (Math.abs(this.pos.x - EntityManager.player.pos.x) < 200)
    //動く
    //弾を発射
    if(this.isActive){
      this.spid = 1;
      if(this.frame%this.term == 0){
        let p = CPV(this.pos);
        p = ADV(p,VECX(4));//弾は中心から
          let v = {
            x : 0,
            y : -1,
          }
          let b = new eBullet2(p,v);
          //SE
          Audio.PlaySE("enemy5Shot");
          EntityManager.addEntity(b);
      }
    }else{
      this.spid = 0;
      this.frame = 0;
    }
    /*きょうつう*/
 //   this.Collision();
    this.Physics();
    this.Hurt();
    this.Animation();
    //observer
    if(this.hp<=0){
      this.Die();
    }
    this.frame++;
  }
}
