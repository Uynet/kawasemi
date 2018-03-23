import Enemy from './enemy.js';
import Art from '../../art.js';
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import eBullet2 from '../../Entity/Enemy/eBullet2.js';
import Explosion1 from '../Effect/explosion1.js';
import Enemy5AI from '../AI/enemy5AI.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Param from '../../param.js';

//playerに踏まれると膨らむ
//膨らんで爆発
export default class Enemy6 extends Enemy{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.frame = 0;
    this.type = ENTITY.ENEMY;
    this.dir = 1;
    this.name = "enemy6";
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy6;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    /*パラメータ*/
    this.addAI(new Enemy5AI(this,200));
    this.param = Param.enemy6
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = 0 * this.param.gravity;
    this.coin = this.param.coin;
    this.exp = this.param.exp;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    this.isActive = false;
    this.isSwelling = false;//膨らんでいるとtrue;
    this.isShrinking = false;//縮んでいる時true
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
  }
  Animation(){
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = ADV(this.pos,VECN(8));
  }
  Swell(){
    //1.5まで大きくなる
    let d = 1.5 - this.sprite.scale.x; 
    this.sprite.scale.x += d*0.1;
    this.sprite.scale.y += d*0.1;
    this.collider.hitbox.width = 16 * this.sprite.scale.x
    this.collider.hitbox.height = 16 * this.sprite.scale.y
    if(this.sprite.scale.x > 1.49){
      this.isSwelling = false;
      this.isShrinking = true;
    }
  }
  Shrink(){
    this.sprite.scale.x -= 0.3;
    this.sprite.scale.y -= 0.3;
    if(this.sprite.scale.x < 0.1){
      this.Bomb();
    }
  }
  Bomb(){
    if(DIST(this.pos,EntityManager.player.pos)<32){
      EntityManager.player.Damage(-this.exp);
    }
    Audio.PlaySE("missileHit");
    EntityManager.addEntity(new Explosion1(this.pos));
    this.Die();
  }


  Update(){
    /*きょうつう*/
    this.Collision();
    this.Physics();
    this.Hurt();
    this.Animation();
    if(this.isSwelling){
      this.spid = 1;
      this.Swell();
    }
    if(this.isShrinking){
      this.Shrink();
    }
    //observer
    if(this.hp<=0){
      //this.Bomb();
      this.isSwelling = true;
    }
    this.frame++;
  }
}
