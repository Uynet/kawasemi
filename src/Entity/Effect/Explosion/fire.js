import EFFECT from '../effect.js';
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Pool from '../../../Stage/pool.js';

export default class Fire extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.pattern = Art.bulletPattern.explosion.fire;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    let texture = new PIXI.Graphics();
    this.color = 0xFFA219;
    this.size = 16;
    texture.beginFill(this.color);
    texture.drawCircle(0,0,this.size);
    texture.endFill();
    this.sprite = texture;
  }
  Init(pos,vel){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "fire";
    this.continuasFrame =  0;
    this.spid = 0;
    /*スプライト*/
    this.sprite.position = this.pos;
    this.sprite.alpha = 0.17;
    this.sprite.scale.set(6);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Scaling(){
    //this.size *= 0.9;
    let d = (2 - this.sprite.scale.x)*0.2;
    this.sprite.scale.x += d;
    this.sprite.scale.y += d;
  }
  Update(){
    this.ExecuteAI();
    this.Scaling();
    this.sprite.alpha *= 0.92;
    if( this.frame > 40) Pool.Remove(this);
  }
}
