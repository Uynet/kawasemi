import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Enemy2AI from '../AI/enemy2AI.js';
import moveReflect from '../AI/moveReflect.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Coin from '../Mover/coin.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Param from '../../param.js';
import Explosion2 from '../Effect/explosion2.js';

export default class Enemy2 extends Enemy{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.frame = 0;
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy2;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.param = Param.enemy2;
    this.addAI(new moveReflect(this));
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.gravity = this.param.gravity;
    this.coin = this.param.coin;
    /*フラグ*/
    this.isJump = false;
    this.isAlive = true;
    /*床の親子関係*/
    this.floor = {
      on : false,
      under : null
    }
    this.vel = Rand2D(1);
  }
  //die
  Animation(){
    this.spid = Math.floor(this.frame/2)%4;
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
  }

  Update(){
    for (let AI of this.AIList){
      AI.Do();
    }
    this.Physics();
    this.Hurt();
    this.Animation();
    this.frame++;
    //observer
    if(this.hp<=0){
      this.Die();
    }
  }
}
