import EFFECT from '../effect.js';
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Pool from '../../../Stage/pool.js';
import Collision from "../../../Collision/collision.js";
import Collider from '../../../Collision/collider.js';
import Box from '../../../Collision/box.js';

export default class Smoke extends EFFECT{
  constructor(pos,vel,size){
    super(pos,vel);
    this.pattern = Art.bulletPattern.explosion.smoke;
    this.sprite = new PIXI.Sprite(this.pattern[this.spid]);
//    this.collider = new Collider(SHAPE.BOX,new Box(pos,32,32));//衝突判定の形状
    this.addBasic();
    this.addAnimator(false,20,8);
  }
  Init(pos,vel,size){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "smoke";
    this.continuasFrame =  0;
    this.size = size;//煙の大きさ 浮力にも関わってくる
    /*スプライト*/
    this.spid = 0;
    this.sprite.alpha = 0.6;
    this.sprite.position = this.pos;
    this.sprite.scale.set(0.0);
    this.sprite.anchor.set(0.5);
    this.e = 0.4;
    this.sprite.blendMode = PIXI.BLEND_MODES.DARKEN;
  }
  onAnimationEnd(){
      Pool.Remove(this);
  }
  Update(){
    this.ExecuteAI();
    this.ScaleTo(this.size,0.1);
    this.vel = scala(0.9,this.vel);
    if(this.frame%20 == 19)this.sprite.alpha -= 0.1;
  }
}
