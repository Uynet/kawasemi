import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

export default class GetCoin extends EFFECT{
  constructor(pos){
    super(pos,vec0());
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.coin.get;
    this.BasicEffectInit();
    this.sprite.alpha = 0.7;
    this.addBasic();
    this.addAnimator(false,3,4);
  }

  Update(){
    this.ExecuteAI();
  }
}
