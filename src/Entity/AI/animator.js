import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';

export default class Animator{
  constructor(entity,isLoop,term,frames){
    this.entity = entity;
    this.isLoop = isLoop;
    this.animTerm = term;
    this.animFrames = frames;
  }
  //note : 先にanimationendでEntityが消えるとその後のスプライト処理でバグる事がある
  Do(){
      this.entity.sprite.texture = this.entity.pattern[this.entity.spid];
    if(this.entity.frame%this.animTerm == this.animTerm-1){
      this.entity.spid++;
      if(this.isLoop) this.entity.spid = this.entity.spid%this.animFrames;
      else{
        if(this.entity.spid == this.animFrames){
          this.entity.spid--;
          this.entity.onAnimationEnd();
        }
      }
    }
    this.entity.sprite.position = this.entity.pos;
  }
}
