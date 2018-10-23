import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';

//閃光
export default class Fire2 extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    this.Init(pos,VEC0());
  }
  Init(pos,vel){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "fire2";
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.fire;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 1;
    this.sprite.scale.set(1);
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.sprite.position = this.pos;
    let a = 10;
    this.pos = ADV(this.pos,this.vel);
    this.sprite.scale.x *= 0.82;
    this.sprite.scale.y *= 0.82;
    //this.sprite.scale = ADV(this.sprite.scale, VECN(1/(this.frame+4)));
    //this.sprite.alpha = 0.5 - this.frame/40;
    if(this.frame%1==0)this.spid = 1;
    if(this.spid >= 8){
      this.spid = 0;
      EntityManager.removeEntity(this);
    }
    this.frame++;
    this.sprite.texture = this.pattern[this.spid];
  }
}
