import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

/*bullet1発射した時のエフェクト*/
export default class BulletShot extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.pattern = Art.bulletPattern.shot;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.addAnimator(false,3,4);
  }

  Update(){
    this.ExecuteAI();
    //phys
    this.pos = ADV(this.pos,this.vel);
    this.frame++;
  }
}
