import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';
import Drawer from '../../drawer.js';

/*bullet3残像*/
export default class BulletBlur2 extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    /*基本情報*/
    this.name = "bulletblur2";
    this.frame = 0;
    this.isAlive = true;//消えたらfalse
      /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = Art.bulletPattern.blur2;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.scale = VECN(Rand(0.5)+1);
    this.sprite.position = ADV(this.pos,VECN(8));
    //this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Physics(){
    this.pos = ADV(this.pos,this.vel);
    this.vel = MLV(this.vel,VECN(0.9));
  }


  Update(){
    if(this.isAlive){
      this.sprite.alpha *= 0.9
      //this.sprite.scale = ADV(this.sprite.scale,VECN(this.frame/256));
      this.Physics();
      this.sprite.position = ADV(this.pos.x,VECN(8));
      this.sprite.texture = this.pattern[this.spid];
      this.spid = Math.floor(this.frame/4)%4;
      if(this.frame >= 40){
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
