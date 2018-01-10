import Util from '../util.js';

export default class Collision{

  /*collisionInfoを返す */
  static on(e1,e2){
    let isHit = false; //衝突したかどうかのbool値
      //ココが怪しい
      //衝突がtrueなら必ず法線が帰ってくるはずなのに
      //プレイヤー側の押し出しの途中で法線が拾えてない(?)事がある

      let n = {x:99999,y:0}; // 押し出すべき方向(法線) 衝突していなければundefined
    /*円同士の衝突判定*/
    if(e1.collisionShape.shape == SHAPE.CIRCLE && e2.collisionShape.shape == SHAPE.CIRCLE){
      let circ1 = e1.collisionShape.hitbox;
      let circ2 = e2.collisionShape.hitbox;
      if(Util.distance(circ1.pos,circ2.pos) < circ1.r + circ2.r){
        isHit = true;
        n = Util.nomalize({x:circ1.pos.x-circ2.pos.x , y:circ1.pos.y-circ2.pos.y});
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit , n);
    }

    /*矩形同士*/
    /*とりあえず正方形*/
    /*下記途中*/
    if(e1.collisionShape.shape == SHAPE.BOX && e2.collisionShape.shape == SHAPE.BOX){
      let box1 = e1.collisionShape.hitbox;
      let box2 = e2.collisionShape.hitbox;
      if(box1.pos.x < box2.pos.x + box2.height &&
        box2.pos.x < box1.pos.x + box1.height &&
        box1.pos.y < box2.pos.y + box2.width &&
        box2.pos.y < box1.pos.y + box1.width
      ){
        //0 ↓ 0   1
        //1 → 1   0
        //2 ↑ 0   -1
        //3 ← -1  0
        let meri = [
          box2.pos.y+box2.height - box1.pos.y , 
          box2.pos.x+box2.width-box1.pos.x , 
          box1.pos.y+box1.height - box2.pos.y ,
          box1.pos.x+box1.width - box2.pos.x
        ];

        let maxI = Util.maxIndex(meri);
 //       console.log(meri);
        isHit = true;
        switch(maxI){
          case 2: n = {x:0 , y:1};break;
 case 3: n = {x:1 , y:0};break;
 case 0:n = {x:0 , y:-1};break;
 case 1:n = {x:-1 , y:0};break;
        }
      }else{
        isHit = false;
      }
      return new CollisionInfo(isHit , n);
    }
    throw new Error("po");
  }
}

//衝突判定クラス
class CollisionInfo{
  constructor(isHit,n){
    this.isHit = isHit; // 衝突したかどうか bool
      this.n = n //衝突したならば法線
  }
}
