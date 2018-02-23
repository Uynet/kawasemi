import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';

export default class Sonic extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.sonic;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.16;

    this.arg = ADV(VECN(2),Rand2D(1));
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    //phys
    this.pos = ADV(this.pos,this.vel);

    this.sprite.scale = ADV(this.sprite.scale,MLV(this.arg,VECN(4/(this.frame+4))));
    this.sprite.alpha *= 0.8;

    if(this.spid == 4){
      EntityManager.removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
