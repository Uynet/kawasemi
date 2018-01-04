class Collision{
  on(e1,e2){
    //円同士の衝突判定
    if(e1.collisionShape.shape == "circle" && e2.collisionShape.shape == "circle"){
      let isHit;
      let circ1 = e1.collisionShape.shapeObject;
      let circ2 = e2.collisionShape.shapeObject;
      if(util.distance(circ1.pos,circ2.pos) < circ1.r + circ2.r){
        isHit = true;
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit);
    }
  }
}

class CollisionInfo{
  constructor(isHit){
    this.isHit = isHit; // bool
  }
}
