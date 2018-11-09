import EFFECT from './effect.js';
import powSizeAI from "../AI/powSizeAI.js";
import Art from "../../art.js";

/*bullet3残像*/
export default class BulletTrail2 extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    /*基本情報*/
    this.name = "bullettrail2";
      /*スプライト*/
    this.pattern = Art.bulletPattern.trail2;
    this.BasicEffectInit();
    this.sprite.anchor.set(0.5);
    this.sprite.scale = vec2(Rand(0.5)+1);
    this.sprite.position = add(this.pos,vec2(8));
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.addAI(new powSizeAI(this,0.9));
    this.addAnimator(false,4,4);
  }
  Update(){
    this.ExecuteAI();
    this.sprite.position = add(this.pos,vec2(8));
  }
}
