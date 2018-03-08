import Enemy from './enemy.js';
import Art from '../../art.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Enemy2AI from '../AI/enemy2AI.js';
import Shot from '../AI/shot.js';
import MoveLissajous from '../AI/moveLissajous.js';
import UIManager from '../../UI/uiManager.js'
import FontEffect from '../Effect/fontEffect.js';
import Coin from '../coin.js';
import EventManager from '../../Event/eventmanager.js';
import QuakeEvent from '../../Event/quakeEvent.js';
import Util from '../../util.js';
import Param from '../../param.js';
import Explosion2 from '../Effect/explosion2.js';

let player;

export default class Enemy3 extends Enemy{
  constructor(pos){
    super(pos,VEC0());
    player = EntityManager.player;
    /*基本情報*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.arg = 0;
    this.frame = 0;
    /*スプライト*/
    this.pattern = Art.enemyPattern.enemy3;
    this.spid = 0; //spriteIndex 現在のスプライト番号
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);//現在表示中のスプライト
    this.sprite.position = this.pos;
    /*パラメータ*/
    this.param = Param.enemy3;
    this.addAI(new Shot(this));
    this.addAI(new MoveLissajous(this));
    this.atkMin = this.param.atkMin;
    this.atkMax = this.param.atkMax;
    this.hp = this.param.hp;
    this.coin = this.param.coin;
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
    this.arg = Math.atan((player.pos.y-this.pos.y)/(player.pos.x-this.pos.x));
    if(this.pos.x > player.pos.x ) this.arg += Math.PI;
  }
}
