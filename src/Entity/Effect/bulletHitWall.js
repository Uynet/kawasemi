import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

/*bullet1壁にぶつかった時した時のエフェクト*/
export default class BulletHitWall extends EFFECT{
  constructor(pos){
    super(pos,vec0());
    this.pattern = Art.bulletPattern.hitWall;
    this.BasicEffectInit();
    this.addBasic();
    this.addAnimator(false,3,4);
  }
}
