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
    if(this.entity.Modulo(this.emitTerm)){
      let p = copy(this.entity.pos);
      let d = Rand2D(5);
      p = add(p,d);
      let v = fromPolar(this.entity.arg+Math.PI,1);
      let trail = new this.Trail(p,v);//引数どうしよ
      EntityManager.addEntity(trail);
    }
  }
}
