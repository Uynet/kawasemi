import Util from '../util.js';

export default class Collision{
  static on(e1,e2){

    //??
    let coltype  = {
      e1shape : e1.collisionShape.shape,
      e2shape : e2.collisionShape.shape
    }

    let c_to_c = {
      e1shape : SHAPE.CIRCLE,
      e2shape : SHAPE.CIRCLE
    }

    //円同士の衝突判定
    if(e1.collisionShape.shape == SHAPE.CIRCLE && e2.collisionShape.shape == SHAPE.CIRCLE){
      let isHit;
      let circ1 = e1.collisionShape.hitbox;
      let circ2 = e2.collisionShape.hitbox;
      if(Util.distance(circ1.pos,circ2.pos) < circ1.r + circ2.r){
        isHit = true;
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit);
    }
    throw new Error("po");
  }
}

//衝突判定クラス
class CollisionInfo{
  constructor(isHit){
    this.isHit = isHit; // bool
  }
}
