import EFFECT from './effect.js';
import Art from '../../art.js';
import EntityManager from '../../Stage/entityManager.js';
import Drawer from '../../drawer.js';

export default class Signpop extends EFFECT{
  constructor(pos){
    super(pos,VEC0());
    /*基本情報*/
    this.name = "signpop";
    /*スプライト*/
    this.spid = 0; //12~15
    this.frame = 0;
    this.pattern = Art.bulletPattern.signpop;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
  }
  Delete(){
    EntityManager.removeEntity(this);
  }

  Update(){
    this.sprite.texture = this.pattern[this.spid];
    this.spid = Math.floor(this.frame/4)%4;
    this.sprite.position = this.pos;
    this.frame++;
  }
}
