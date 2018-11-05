import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Timer from "../../timer.js";

export default class BasicAI{
  constructor(entity){
    this.entity = entity;
    this.entity.continuasFrame = entity.frame;//must be 0
    console.assert(this.entity.continuasFrame == 0);
  }
  Do(){
    this.entity.continuasFrame += Timer.timeScale;
    this.entity.frame=Math.floor(this.entity.continuasFrame);
    this.entity.sprite.position = this.entity.pos;
    this.entity.sprite.texture = this.entity.pattern[this.entity.spid];
    //observer
    if(this.entity.hp<=0)this.entity.OnDying();
    //if(this.entity.frame>=this.entity.maxRemainFrame)this.entity.On??();
  }
}
