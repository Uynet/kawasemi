import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';

//閃光
export default class Flash extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
  }
  Init(pos,vel){
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.frame = 0;
    this.name = "flash"
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.flash;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.2;
    this.sprite.scale.set(1);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    //this.sprite.texture = this.pattern[this.spid];
    this.sprite.alpha *=0.8;
    this.sprite.scale = VECN(2);
    if(this.frame == 4){
      Pool.Remove(this);
      //EntityManager.removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
