import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Collision from '../Collision/collision.js';
import Box from '../Collision/box.js';
import EntityManager from '../Stage/entityManager.js';
import Util from '../util.js';
import Entity from './entity.js';

//コイン
export default class Coin extends Entity{
  constructor(pos){
    super(pos,{x:2 * (Math.random()-0.5),y:-3});
    /*基本情報*/
    this.frame = 0;
    
    /*スプライト*/
    this.pattern = Art.enemyPattern.coin;
    this.spid = 0;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = pos;
    /*コライダ*/
    this.collider = new Collider(SHAPE.BOX,new Box(pos,8,8));//衝突判定の形状
    /*パラメータ*/
    this.gravity = 0.3;
    this.e = 0.9;
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


  Update(){
    //Animation
    if(this.frame%10 == 0){
      this.spid = (this.spid+1)%4;
      this.sprite.texture = this.pattern[this.spid];
    }
    //Collision
    this.Collision();
    this.Physics();

    if( this.frame > 100 ){
      EntityManager.removeEntity(this);
    }

    this.sprite.position = this.pos;
    this.frame++;
  }
}
