import EFFECT from '../effect.js';
import Art from '../../../art.js';
import EntityManager from '../../../Stage/entityManager.js';
import Pool from '../../../Stage/pool.js';

//閃光
export default class Fire extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
  }
  Init(pos,vel){
    /*基本情報*/
    this.pos = pos;
    this.vel = vel;
    this.name = "fire";
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.fire;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    let texture = new PIXI.Graphics();
    this.color = 0xFFA219;
    this.size = 16;
    texture.beginFill(this.color);
    texture.drawCircle(0,0,this.size);
    texture.endFill();
    this.sprite = texture;
    this.sprite.position = this.pos;
    this.sprite.alpha = 0.17;
    this.sprite.scale.set(6);
    //this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.sprite.position = this.pos;
    let a = 10;
    this.pos = ADV(this.pos,this.vel);
    this.size *= 0.9;
    let d = (2 - this.sprite.scale.x)*0.2;
    this.sprite.scale.x += d;
    this.sprite.scale.y += d;
    this.sprite.alpha *= 0.92;
    if(this.frame%3==0) this.spid = 1;//this.spid+=1;
    if(this.spid >= 8 || this.frame > 40){
      this.spid = 0;
      this.frame = 0;
      Pool.Remove(this);
    }
    this.frame++;
    //this.sprite.texture = this.pattern[this.spid];
  }
}
