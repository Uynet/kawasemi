import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';

//woodboxを壊した時の破片
export default class BlockDebris extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "blockDebris";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
    this.gravity = 0.1;
    /*スプライト*/
    this.spid = 0; //12~15
    //this.pattern = Art.bulletPattern.blockDebris;
    this.pattern = Art.bulletPattern.blockDebris;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.rotation = Rand(2);
  }
  Physics(){
    this.vel.y += this.gravity;
    this.pos = ADV(this.pos,this.vel);
  }
  Update(){
    if(this.isAlive){
      this.Physics();
      this.sprite.position = ADV(this.pos.x,VECN(8));
      this.sprite.texture = this.pattern[this.spid];
      this.spid = Math.floor(this.frame/4)%4;
      if(this.frame >= 16){
        //消える時に一回だけ呼ばれる
        if(this.isAlive){
          EntityManager.removeEntity(this);
          this.isAlive = false
        }
      }
      this.sprite.position = ADV(this.pos,VECN(8));
      this.frame++;
    }
  }
}
