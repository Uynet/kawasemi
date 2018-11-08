import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Timer from "../../timer.js";

export default class BasicAI{
  constructor(entity){
    this.entity = entity;
  }
  Do(){
    this.entity.continuasFrame += Timer.GetTimeScale();
    this.entity.frame=Math.floor(this.entity.continuasFrame);
    this.entity.sprite.position.x = Math.floor(this.entity.pos.x);
    this.entity.sprite.position.y = Math.floor(this.entity.pos.y);
    this.entity.sprite.position.x -= this.entity.sprite.position.x%2;
    this.entity.sprite.position.y -= this.entity.sprite.position.y%2;

    this.entity.sprite.texture = this.entity.pattern[this.entity.spid];
    //observer
    //ondying後にすぐ消去されないAIでondyingがしばらく呼ばれ続ける問題がある
    if(this.entity.hp<=0)this.entity.OnDying();
    //if(this.entity.frame>=this.entity.maxRemainFrame)this.entity.On??();
  }
}
