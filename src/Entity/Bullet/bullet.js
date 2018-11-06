import Entity from '../entity.js';
import Art from '../../art.js';
import Param from '../../param.js';

export default class Bullet extends Entity{
  SetSprite(){
    this.pattern = Art.bulletPattern[this.name];
    this.sprite = Art.CreateSprite(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
  }
  BasicBulletInit(){
    this.SetSprite();
    this.SetParam(Param[this.name]);
  }
  constructor(pos,vel){
    super(pos,vel);
    /*基本情報*/
    this.layer = "ENTITY";
    this.isMultiple = false;
    this.type = "MOVER";
    this.isUpdater  =true;
    this.AIList = [];
  }
}
