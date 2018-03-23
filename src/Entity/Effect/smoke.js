import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Pool from '../../Stage/pool.js';

export default class Sonic extends EFFECT{
  constructor(pos,vel,size){
    super(pos,vel);
  }
  Init(pos,vel,size){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "smoke";
    this.frame = 0;
    this.size = size;//煙の大きさ 浮力にも関わってくる
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.smoke;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.alpha = 0.7;
    this.sprite.position = this.pos;
    this.sprite.scale.set(size/5);
    this.sprite.anchor.set(0.5);
  }

  Update(){
    let b = 10;
    this.pos = ADV(this.pos,this.vel);
    this.vel.x *= (1-this.frame/10);
    if(this.vel.y > 0) this.vel.y *= 0.9;
    this.sprite.scale = VECN((this.size/2)/(this.frame+5));
    this.sprite.alpha -= 0.03;
    if(this.frame == 40){
      Pool.Remove(this);
    }
    this.sprite.position = this.pos;

    this.frame++;
  }
}
