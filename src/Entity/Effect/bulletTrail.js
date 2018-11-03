import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';
import Drawer from '../../drawer.js';

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
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.scale = vec2((Rand(0.5)+1)/1);
    this.sprite.position = this.pos;
    //this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.addAnimator(false,4,6);
  }
  Physics(){
    this.pos = add(this.pos,this.vel);
    this.vel = MLV(this.vel,vec2(0.9));
  }
  Update(){
    this.ExecuteAI();
    //this.sprite.alpha *= 0.9
    this.sprite.scale = ADV(this.sprite.scale,vec2(this.frame/256));
    this.sprite.scale.x *= 0.9;
    this.sprite.scale.y *= 0.9;
    this.Physics();
    this.frame++;
  }
}
