import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';

/*bullet3残像*/
export default class BulletTrail2 extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.Init(pos,vel);
  }
  Init(pos,vel){
    /*基本情報*/
    this.name = "bullettrail2";
      /*スプライト*/
    this.pattern = Art.bulletPattern.trail2;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.scale = VECN(Rand(0.5)+1);
    this.sprite.position = ADV(this.pos,VECN(8));
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
    this.addAnimator(false,4,4);
  }

  Physics(){
    this.pos = add(this.pos,this.vel);
    this.vel = MLV(this.vel,VECN(0.9));
  }


  Update(){
    this.ExecuteAI();
      this.Physics();
      this.sprite.scale = ADV(this.sprite.scale,VECN(-this.frame/128));
      this.sprite.alpha *= 0.94;
      this.sprite.position = ADV(this.pos,VECN(8));
      this.frame++;
  }
}
