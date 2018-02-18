import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Util from '../../util.js';

//爆発エフェクト
export default class Explosion extends EFFECT{
  constructor(name,pos){
    super(pos,{x:0,y:0});
    /*基本情報*/
    this.type = ENTITY.EFFECT;
    this.frame = 0;
    /*スプライト*/
    this.spid = 0;
    this.name = name;
    switch(this.name){
      case "flash" : this.pattern = Art.bulletPattern.explosion.flash;break;
    }
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    //this.sprite = Art.SpriteFactory(this.pattern);
    this.sprite.position = this.pos;
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    if(this.frame == 4){
      EntityManager.removeEntity(this);
    }
    this.frame++;
  }
}
