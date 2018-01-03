class Collision{
  on(e1,e2){
    //円同士の衝突判定
    if(e1.shape == "circle" && e2.shape == "circle"){
      let isHit;
      if(util.distance(e1.circle.pos,e2.circle.pos) < e1.circle.r + e2.circle.r){
        isHit = true;
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit);
    }
    throw Error("うんこ");
  }
}

class CollisionInfo{
  constructor(isHit){
    this.isHit = isHit; // bool
  }
}
