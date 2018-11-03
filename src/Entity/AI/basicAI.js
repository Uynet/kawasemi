import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';

export default class BasicAI{
  constructor(entity){
    this.entity = entity;
  }
  Do(){
    this.entity.frame++;
    this.entity.sprite.position = this.entity.pos;
    this.entity.sprite.texture = this.entity.pattern[this.spid];
    if(this.entity.hp<=0)this.entity.OnDying();
  }
}
