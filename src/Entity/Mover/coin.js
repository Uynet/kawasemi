import Art from '../../art.js';
import Audio from '../../audio.js';
import Collider from '../../Collision/collider.js';
import Collision from '../../Collision/collision.js';
import Box from '../../Collision/box.js';
import EntityManager from '../../Stage/entityManager.js';
import Entity from '../entity.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import GetCoin from '../Effect/getCoin.js';
import Bright from '../Effect/bright.js';
import BasicAI from "../AI/Basic/basicAI.js";
import EmitTrail from "../AI/emitTrail.js";

const START_FLASH_FRAME = 300;
const MAX_REAMIN_FRAME = 450;

let player;
//コイン
export default class Coin extends Entity{
  constructor(pos){
    player = EntityManager.player;
    super(pos,{x:Rand(2),y:-3});
    /*基本情報*/
    this.type = "MOVER";
    this.layer = "ENTITY";
    this.isUpdater = true;
    /*スプライト*/
    this.pattern = Art.enemyPattern.coin;
    this.sprite = Art.CreateSprite(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.collider = new Collider(SHAPE.BOX,new Box(pos,9,9));
    /*パラメータ*/
    this.gravity = 0.5 + Rand(0.2);
    this.e = 0.9;
    this.vel.y = 0.3;
    /*AI*/
    this.addAI(new BasicAI(this));
    this.addAI(new EmitTrail(this,Bright,8));
    this.addAnimator(true,3,12);
  }
  Collision(){
    //collision at wall
    for(let l of EntityManager.colliderList){
      if(l == this) continue;
      let c = Collision.on(this,l);
      if(c.isHit){
        this.OnCollision(c,l);
      }
    }
  }
  OnCollision(colInfo,l){
    this.OnCollisionWall(colInfo);
  }
  OnCollisionWall(colInfo){
    /* 衝突応答*/
    Audio.PlaySE("coin2");

    this.vel = reflect(this.vel,colInfo.n);
    /*押し出し*/
    this.pos.x += colInfo.n.x * colInfo.depth;
    this.pos.y += colInfo.n.y * colInfo.depth;
    /*note : now isHit == false*/
  }
  GetByPlayer(){
    //プレイヤーに回収される
    if(DIST(this.pos,player.pos)<48){
      this.coltype = "none";
      let vec = normalize(
        sub(player.pos,this.pos)
      );
      this.pos.x += 5 * vec.x;
      this.pos.y += 5 * vec.y;
      if(DIST(this.pos,player.pos)<2){
        Audio.PlaySE("coin1",-1);
        EntityManager.addEntity(new GetCoin(this.pos,vec0()));
        player.GetScore(1);
        this.Delete();
      }
    }
  }
  Flashing(){
    if(this.frame%8 <4) this.sprite.alpha = 0;
    else this.sprite.alpha = 1;
  }
  Update(){
    this.ExecuteAI();
    //Collision
    if(this.coltype!="none")this.Collision();
    this.BasicPhysics();
    if(EntityManager.player.isAlive)this.GetByPlayer();
    //時間立つと点滅
    if( this.frame > START_FLASH_FRAME)this.Flashing();
    if( this.frame > MAX_REAMIN_FRAME)this.Delete();
  }
}
