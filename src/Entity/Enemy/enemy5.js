import Enemy from './enemy.js';
import Art from '../../art.js';
import Audio from '../../audio.js'
import Collision from '../../Collision/collision.js';
import EntityManager from '../../Stage/entityManager.js';
import moveReflect from '../AI/moveReflect.js';
import eBullet2 from '../../Entity/Enemy/eBullet2.js';
import Enemy5AI from '../AI/enemy5AI.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Param from '../../param.js';

export default class Enemy5 extends Enemy{
  constructor(pos){
    super(pos,vec0());
    /*基本情報*/
    this.name = "enemy5";
    this.BasicEnemyInit();
    /*パラメータ*/
    this.addAI(new Enemy5AI(this,200));
    this.addAI(new moveReflect(this));
    /*フラグ*/
    this.isActive = false;
    this.vel.x = -0.5;
  }
  OnCollision(c,entity){
    if(entity.type == ENTITY.ENEMY)this.OnCollisionEnemy(c,entity);
    else if(entity.type == ENTITY.WALL)this.OnCollisionWALL(c,entity);
  }
  OnCollisionEnemy(c,l){
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
  OnCollisionWall(c,l){
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
  Animation(){
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  ActiveAI(){
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
  }
  Update(){
    this.ExecuteAI();
    if(this.isActive){
      this.spid = 1;
      this.ActiveAI();
    }else{
      this.spid = 0;
      this.frame = 0;
    }
    this.Hurt();
    this.Animation();
  }
}
