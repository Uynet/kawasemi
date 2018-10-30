import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';

export default class EmitTrail{
  //termフレーム毎にtraiをemitします
  constructor(entity,Trail,emitTerm){
    this.emitTerm = emitTerm;
    this.entity = entity;
    this.Trail = Trail;//クラス渡し
  }
  Do(){
    if(this.entity.frame%this.emitTerm == this.emitTerm-1){
      let p = CPV(this.entity.pos);
      let d = Rand2D(5);
      p = ADV(p,d);
      let v = POV(this.entity.arg+Math.PI,1);
      let trail = new this.Trail(p,v);//引数どうしよ
      EntityManager.addEntity(trail);
    }
  }
}
