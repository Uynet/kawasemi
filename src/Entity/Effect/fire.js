import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';

//閃光
export default class Fire extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.fire;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.sprite.position = this.pos;
    let a = 10;
    this.pos = ADV(this.pos,this.vel);
    this.sprite.scale = ADV(this.sprite.scale, VECN(1/(this.frame+4)));
    this.sprite.alpha = 0.5 - this.frame/40;
    if(this.frame == 16){
      EntityManager.removeEntity(this);
    }
    this.frame++;
  }
}
