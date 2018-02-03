import Enemy from './enemy.js';
import EFFECT from './effect.js';
import Art from '../art.js';
import EntityManager from '../Stage/entityManager.js';
import Util from '../util.js';

/*bullet1発射した時のエフェクト*/
export default class BulletShot extends EFFECT{
  constructor(pos){
    super(pos,{x:0,y:0});
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    /*スプライト*/
    this.spid = 4; //4,5,6,7
    this.tex = Art.bulletPattern[this.spid];
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = this.pos;
  }

  Update(){
    this.sprite.texture = Art.bulletPattern[this.spid];
    this.spid = 4 + Math.floor(this.frame/3);
    if(this.spid == 8){
      EntityManager.removeEntity(this);
    }
    this.frame++;
  }
}
