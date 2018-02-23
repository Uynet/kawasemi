import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';

//閃光
export default class Flash extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.flash;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.4;
  }

  Update(){
    //this.sprite.texture = this.pattern[this.spid];
    this.sprite.alpha *=0.8;
    this.sprite.scale = VECN(2);
    if(this.frame == 4){
      EntityManager.removeEntity(this);
    }
    this.sprite.position = this.pos;
    this.frame++;
  }
}
