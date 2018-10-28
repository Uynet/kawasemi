import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';

export default class Animator{
  constructor(entity,isLoop,term,frames){
    this.entity = entity;
    this.isLoop = isLoop;
    this.animTerm = term;
    this.animFrames = frames;
  }
  Do(){
    if(this.entity.frame%this.animTerm == 0){
      this.entity.sprite.texture = this.entity.pattern[this.entity.spid];
      if(this.isLoop) this.entity.spid = (this.entity.spid+1)%this.animFrames;
      else this.entity.spid = Math.min(this.entity.spid+1,this.animFrames-1);
    }
  }
}
