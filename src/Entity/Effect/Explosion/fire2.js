import EFFECT from '../effect.js';
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Pool from '../../../Stage/pool.js';
import PowSizeAI from "../../AI/powSizeAI.js";

//閃光
export default class Fire2 extends EFFECT{
  constructor(pos){
    super(pos,vec0());
    this.Init(pos,vec0());
    this.addAnimator(false,1,8);
    this.addAI(new PowSizeAI(this,0.82));
  }
  Init(pos,vel){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "fire2";
    /*スプライト*/
    this.continuasFrame =  0;
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.fire;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 1;
    this.sprite.scale.set(1);
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }
}
