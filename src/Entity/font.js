import Enemy from './enemy.js';
import EFFECT from './effect.js';
import Art from '../art.js';
import EntityManager from '../Stage/entityManager.js';
import Util from '../util.js';
import Drawer from '../drawer.js';
import Collision from '../Collision/collision.js';
import Collider from '../Collision/collider.js';
import Box from '../Collision/box.js';
/*文字*/
export default class Font extends EFFECT{
  //strは表示する文字(今は数字のみ)
  constructor(pos,vel,str){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.name = "string";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
    this.collider = new Collider(SHAPE.BOX,new Box(pos,8,8));//衝突判定の形状
      /*スプライト*/
      /*TODO 🔥 num型をstring型にキャストしているので必ず直す*/
    this.spid = str; //0~9
    this.tex = Art.font[this.spid];
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = this.pos;
    this.gravity = 0.2;
  }

  Collision(){
    for(let l of EntityManager.wallList){
      if(Collision.on(this,l).isHit){
        /*速度*/
        if(Collision.on(this,l).n.x != 0) this.vel.x = 0;
        if(Collision.on(this,l).n.y != 0) this.vel.y *= 0.3;
        /*押し出し*/
        while(Collision.on(this,l).isHit){
          this.pos.x += Collision.on(this,l).n.x/5;
          this.pos.y += Collision.on(this,l).n.y/5;
        }
        /*note : now isHit == false*/
      }
    }
  }

  Update(){
    // this.sprite.texture = this.pattern[this.spid];
    this.Collision();
    //phys
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.y += this.gravity;
    this.sprite.position = this.pos;
    if(this.frame > 30){
      this.sprite.alpha -=0.05; 
    }
    if(this.frame > 90){
      EntityManager.removeEntity(this);
    }
    this.frame++;
  }
}
