import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Enemy2AI from '../AI/enemy2AI.js';
import shotUpper from '../AI/shotUpper.js';
import moveReflect from '../AI/moveReflect.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Coin from '../coin.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Util from '../../util.js';
import Param from '../../param.js';
import Explosion2 from '../Effect/explosion2.js';

let EntityList = EntityManager.entityList;

export default class Enemy3 extends Enemy{
  constructor(pos){
    super(pos,VEC0(),VEC0());
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.frame = 0;
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy3;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    let ENEMY3 = Param.ENEMY3;
    this.addAI(new shotUpper(this));
    this.atkMax = ENEMY3.ATK_MAX;
    this.hp = ENEMY3.HP;
    this.gravity = ENEMY3.GRAVITY;
    this.coin = ENEMY3.COIN;
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
