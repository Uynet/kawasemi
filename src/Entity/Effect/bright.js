import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

export default class Bright extends EFFECT{
  constructor(pos,vel){
    //velが渡されなければ0を渡す
    super(pos,vel);
    /*基本情報*/
    this.pattern = Art.bulletPattern.coin.bright;
    this.BasicEffectInit();
    this.sprite.alpha = 0.7;
    this.addBasic();
    this.addAnimator(false,3,4);
  }
  Update(){
    this.ExecuteAI();
  }
}
