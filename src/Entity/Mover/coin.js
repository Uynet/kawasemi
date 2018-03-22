import Art from '../../art.js';
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Entity from '../entity.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import GetCoin from '../Effect/getCoin.js';
import BrightCoin from '../Effect/brightCoin.js';

let player;
//コイン
export default class Coin extends Entity{
  constructor(pos){
    player = EntityManager.player;
    super(pos,{x:Rand(2),y:-3});
    /*基本情報*/
    this.frame = 0;
    this.e = 0.9;
    this.isUpdater = true;    
    this.type = "MOVER";
    /*スプライト*/
    this.pattern = Art.enemyPattern.coin;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,9,9));//衝突判定の形状
    /*パラメータ*/
    this.gravity = 0.5 + Rand(0.2);
    this.layer = "ENTITY";
    /*AI*/
    this.vel.y = 0.3;
  }
  Collision(){
    this.isJump = true;
    //collision at wall
    for(let l of EntityManager.wallList){
      if(l == this) continue;
      let c = Collision.on(this,l);
      if(c.isHit){
        /* 衝突応答*/
        Audio.PlaySE("coin2");

        /*速度*/
        if(c.n.x != 0) this.vel.x *= -this.e;
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
    this.acc = VEC0();
    this.acc.y += this.gravity;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.x += this.acc.x;
    //最大速度制限
    this.vel.y = BET(-0.5,this.vel.y,0.5);
    this.vel.x = BET(-3,this.vel.x,3);
  }
  GetByPlayer(){
    //プレイヤーに回収される
    if(DIST(this.pos,player.pos)<48){
      this.coltype = "none";
      let vec = NOMALIZE({
        x : player.pos.x - this.pos.x,
        y : player.pos.y - this.pos.y
      });
      this.pos.x += 5 * vec.x;
      this.pos.y += 5 * vec.y;
      if(DIST(this.pos,player.pos)<2){
        Audio.PlaySE("coin1",-1);
        EntityManager.addEntity(new GetCoin(this.pos,{x:0,y:0}));
        player.GetScore(1);
        EntityManager.removeEntity(this);
      }
    }
  }

  Update(){
    //Animation
    if(this.frame%3 == 0){
      this.spid = (this.spid+1)%12;
    }
    //たまに光る
    if(this.frame%(8 + Math.floor(Rand(1))) == 0){
      let p = ADV(this.pos,Rand2D(5));
      console.assert(p);
      EntityManager.addEntity(new BrightCoin(p));
    }
    //Collision
    if(this.coltype!="none")this.Collision();
    this.Physics();
    if(EntityManager.player.isAlive)this.GetByPlayer();
    //時間立つと点滅
    if( this.frame > 300 && this.frame%8 <4) this.sprite.texture = this.pattern[12];
    else this.sprite.texture = this.pattern[this.spid];
    //消える
    if( this.frame > 450 ){
      EntityManager.removeEntity(this);
    }
    this.sprite.position = this.pos;

    this.frame++;
  }
}
