import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import Util from '../util.js';
import Entity from './entity.js';
import BulletHitWall from './Effect/bulletHitWall.js';
import GetCoin from './Effect/getCoin.js';

let player;
//コイン
export default class Coin extends Entity{
  constructor(pos){
    player = EntityManager.player;
    super(pos,{x:2 * (Math.random()-0.5),y:-3});
    /*基本情報*/
    this.frame = 0;
    this.e = -0.9;
    
    /*スプライト*/
    this.pattern = Art.enemyPattern.coin;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,9,9));//衝突判定の形状
    /*パラメータ*/
    this.gravity = 0.3;
    this.type = ENTITY.BULLET;
    /*フラグ*/
    this.isJump = false
    /*AI*/
    //this.AIList = [];
    //this.AIList.push(new Bullet1AI(this));
  }
  Collision(){
    this.isJump = true;
    //collision at wall
    for(let l of EntityManager.wallList){
      if(l == this) continue;
      let c = Collision.on(this,l);
      if(c.isHit){
        /* 衝突応答*/

        /*速度*/
        if(c.n.x != 0) this.vel.x = 0;
        //地面との衝突
        if(c.n.y == -1){ 
          this.isJump = false;
          this.vel.y = Math.min(0,this.vel.y * -this.e);
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.vel.y = Math.min(0,this.vel.y * -0.3)
        }
        /*押し出し*/
        this.pos.x += c.n.x * c.depth;
        this.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
  }
  //phys
  Physics(){
    this.acc.x = 0;
    this.acc.y = 0;
    this.acc.y += this.gravity;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    //摩擦
    if(!this.isJump){
      this.vel.x *= 0.8;
    }
    //最大速度制限
    this.vel.y = Math.min(5,Math.max(this.vel.y,-3));
    this.vel.x = Math.min(3,Math.max(this.vel.x,-3));
  }
  GetByPlayer(){
    //プレイヤーに回収される
    if(Util.distance(this.pos,player.pos)<48){
      let vec = Util.nomalize({
        x : player.pos.x - this.pos.x,
        y : player.pos.y - this.pos.y
      });
      this.pos.x += 5 * vec.x;
      this.pos.y += 5 * vec.y;
      if(Util.distance(this.pos,player.pos)<10){
        EntityManager.addEntity(new GetCoin(this.pos,{x:0,y:0}));
        player.GetScore(1);
        EntityManager.removeEntity(this);
      }
    }
  }

  Update(){
    //Animation
    if(this.frame%10 == 0){
      this.spid = (this.spid+1)%4;
      this.sprite.texture = this.pattern[this.spid];
    }
    //Collision
    this.Collision();
    this.Physics();
    this.GetByPlayer();
    //時間立つと消える
    if( this.frame > 500 ){
      EntityManager.removeEntity(this);
    }

    this.sprite.position = this.pos;
    this.frame++;
  }
}
