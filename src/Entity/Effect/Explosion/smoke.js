import Art from '../../../art.js';
import Ease from "../../../Math/ease.js";
import Pool from '../../../Stage/pool.js';
import EFFECT from '../effect.js';

let pow;

export default class Smoke extends EFFECT{
  constructor(pos,vel,size){
    super(pos,vel);
    this.pattern = Art.bulletPattern.explosion.smoke;
    this.layer = "BACK";
    this.sprite = new PIXI.Sprite(this.pattern[this.spid]);
    this.addAnimator(false,20,8);
    pow = Ease.pow(0.8);
  }
  Init(pos,vel,size){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.initVel = vel;
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
    this.vel = mul(this.initVel , vec2(pow(this.continuasFrame)));
    if(this.frame%20 == 19)this.sprite.alpha -= 0.1;
  }
}
