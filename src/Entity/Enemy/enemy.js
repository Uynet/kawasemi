import Entity from '../entity.js';
import Audio from '../../audio.js';
import EntityManager from '../../Stage/entityManager.js';
import FontEffect from '../Effect/fontEffect.js';
import Collision from '../../Collision/collision.js';
import Coin from '../Mover/coin.js'
import Explosion2 from '../Effect/explosion2.js';

export default class Enemy extends Entity{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.ENEMY;
    this.isUpdater = true;
    this.colType = "through";
    this.material = "wall";
    /*固有情報*/
    this.AIList = [];//AIの配列
    /*レイヤー*/
    this.layer = "ENTITY";
  }
  addAI(AI){
    this.AIList.push(AI);
  }
  //自分がダメージを食らう
  Damage(atk){
    Audio.PlaySE("enemyDamage",-0.5);
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
      //自分もダメージ
    //  this.Damage(-1);
    }
  }
  //しぬ
  Die(){
    this.isAlive = false;
      //死ぬ時にコイン
      for(let i = 0;i<this.coin;i++){
        EntityManager.addEntity(new Coin({x:this.pos.x,y:this.pos.y}));
      }
      //EventManager.eventList.push(new QuakeEvent(5));//ゆれ
      EntityManager.removeEntity(this);
      EntityManager.addEntity(new Explosion2(this.pos));
  }
  Physics(){
    if(this.floor.on){
      this.pos.x += this.floor.under.vel.x;
      //this.pos.y += this.floor.under.vel.y;
    }
    if(this.gravity)this.acc.y += this.gravity;

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.acc.y = 0;
    this.acc.x = 0;
    //最大速度制限
  }
  ExecuteAI(){
    for (let AI of this.AIList){
      AI.Do();
    }
  }
}
