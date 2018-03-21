import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';

export default class Sonic extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
  }
  Init(pos,vel,arg){
    this.pos = pos;
    this.vel = vel;
    this.arg = arg;
    /*基本情報*/
    this.frame = 0;
    this.name = "sonic";
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.sonic;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(1);
    this.sprite.alpha = 0.16;
    //this.arg = ADV(VECN(2),Rand2D(1));
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    //phys
    this.pos = ADV(this.pos,this.vel);

    this.sprite.scale = ADV(this.sprite.scale,VECN(4/(this.frame+2)));
    this.sprite.alpha *= 0.8;

    if(this.spid == 4){
      Pool.Remove(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
