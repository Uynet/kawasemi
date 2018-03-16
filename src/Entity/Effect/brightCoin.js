import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

export default class BrightCoin extends EFFECT{
  constructor(pos,vel){
    //velが渡されなければ0を渡す
    super(pos,vel);
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.coin.bright;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.alpha = 0.7;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    //phys
    
    this.pos = ADV(this.pos,this.vel);
    if(this.spid == 4){
      EntityManager.removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
