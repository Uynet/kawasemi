import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';

export default class EmitTrail{
  //termフレーム毎にtraiをemitします
  constructor(bullet,Trail,emitTerm){
    this.emitTerm = emitTerm;
    this.bullet = bullet;
    this.Trail = Trail;//クラス渡し
  }
  Do(){
    if(this.bullet.frame%this.emitTerm == this.emitTerm-1){
      let p = CPV(this.bullet.pos);
      let d = Rand2D(5);
      p = ADV(p,d);
      let v = POV(this.bullet.arg+Math.PI,4);
      let blur = new this.Trail(p,v);//引数どうしよ
      EntityManager.addEntity(blur);
    }
  }
}
