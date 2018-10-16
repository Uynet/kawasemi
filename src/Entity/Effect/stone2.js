import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

//火花2
export default class Stone2 extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    //constructor
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "stone2";
    this.frame = 0;
    this.isNext = false;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.stone;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 1;
    this.size = 8 + Rand(6);
    this.sprite.anchor.set(0.5);
    //this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  Update(){
    this.sprite.scale.set(this.size/16);
    let d = lerp(0.88,0.96,((14-this.size)/12));
    this.vel = MLV(this.vel,VECN(d)); //減速
    this.pos = ADV(this.pos,this.vel);
    this.sprite.position = this.pos;
    this.size *= 0.95;
    this.sprite.rotation += Math.PI/2;
    //持続時間
    if(this.frame >30){
      EntityManager.removeEntity(this);
    }
    this.frame++;
  }
}
