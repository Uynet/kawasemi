import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

export default class GetCoin extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.coin.get;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 0.7;
    this.addAnimator(false,3,4);
  }

  Update(){
    this.ExecuteAI();
    //phys
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.frame++;
  }
}
