import EFFECT from './effect.js';
import Art from '../../art.js';
import Ease from "../../Math/ease.js";
import PowSizeAI from "../AI/powSizeAI.js";

/*bullet1残像*/
export default class Bullettrail extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "bullettrail";
      /*スプライト*/
    this.pattern = Art.bulletPattern.trail;
    this.BasicEffectInit();
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.scale = vec2((Rand(0.5)+1)/1);
    //this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.addBasic();
    this.addAI(new PowSizeAI(this,0.9));
    this.addAnimator(false,4,6);
  }
}
