import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

/*bullet1発射した時のエフェクト*/
export default class BulletShot extends EFFECT{
  constructor(pos,vel){
    super(pos,vel);
    this.pattern = Art.bulletPattern.shot;
    this.BasicEffectInit();
    this.addBasic();
    this.addAnimator(false,3,4);
  }
}
