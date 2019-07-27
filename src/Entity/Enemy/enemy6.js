import Enemy from './enemy.js';
import Art from '../../art.js';
import Audio from '../../audio.js';
import Collision from '../../Collision/collision.js';
import EntityManager from '../../Stage/entityManager.js';
import eBullet2 from '../../Entity/Enemy/eBullet2.js';
import Explosion1 from '../Effect/Explosion/explosion1.js';
import SetActiveRange from '../AI/setActiveRange.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Param from '../../param.js';

//playerに踏まれると膨らむ
//膨らんで爆発
export default class Enemy6 extends Enemy{
  constructor(pos){
    super(pos,vec0());
    /*基本情報*/
    this.name = "enemy6";
    this.BasicEnemyInit();
    /*スプライト*/
    this.sprite.anchor.set(0.5);
    /*パラメータ*/
    this.addAI(new SetActiveRange(this,200));
    /*フラグ*/
    this.isActive = false;
    this.isSwelling = false;//膨らんでいるとtrue;
    this.isShrinking = false;//縮んでいる時true
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
      EntityManager.player.Damage(this.exp);
    }
    Audio.PlaySE("missileHit");
    EntityManager.addEntity(new Explosion1(this.pos));
    this.Die();
  }
  OnDying(){
    this.isSwelling = true;
  }

  Update(){
    this.ExecuteAI();
    if(this.isSwelling){
      this.spid = 1;
      this.Swell();
    }
    if(this.isShrinking){
      this.Shrink();
    }
    this.sprite.position = add(this.pos,vec2(8));
  }
}
