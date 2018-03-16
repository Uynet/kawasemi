import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';

/*bullet1壁にぶつかった時した時のエフェクト*/
export default class BulletHitWall extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.frame = 0;
    /*スプライト*/
    this.spid = 0; //8~11
    this.pattern = Art.bulletPattern.hitWall
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/3);
    if(this.spid == 4){
      EntityManager.removeEntity(this);
    }
    this.frame++;
  }
}
