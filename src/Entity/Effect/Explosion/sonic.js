import EFFECT from '../effect.js';
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Pool from '../../../Stage/pool.js';
import Drawer from "../../../drawer.js";
import Ease from "../../../Math/ease.js";

const pow = Ease.pow(0.8);

export default class Sonic extends EFFECT{
  constructor(pos){
    super(pos,vec0());
    this.pattern = Art.bulletPattern.explosion.sonic;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.addAnimator(false,3,4);
  }
  Init(pos,vel,arg){
    this.pos = pos;
    this.vel = vel;
    this.arg = arg;
    /*基本情報*/
    this.name = "sonic";
    this.spid = 0;
    this.continuasFrame = 0;
    /*スプライト*/
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.x = 1;
    this.sprite.scale.y = 1;
    this.sprite.alpha = 0.3;
    //this.sprite.filters = [Drawer.testFilter];
    //this.arg = add(vec2(2),Rand2D(1));
  }
  onAnimationEnd(){
    Pool.Remove(this);
  }
  Update(){
    this.ExecuteAI();
    this.sprite.scale = add(this.sprite.scale,vec2(4/(this.frame+2)*2));
    this.sprite.alpha = 0.3*pow(this.continuasFrame);
  }
}
