export default class Collision {
  /*collisionInfoを返す */
  static on(e1, e2) {
    let isHit = false; //衝突したかどうかのbool値
    let n;
    let depth;
    /*円同士の衝突判定*/
    if (
      e1.collider.shape == SHAPE.CIRCLE &&
      e2.collider.shape == SHAPE.CIRCLE
    ) {
      let circ1 = e1.collider.hitbox;
      let circ2 = e2.collider.hitbox;
      if (DIST(circ1.pos, circ2.pos) < circ1.r + circ2.r) {
        isHit = true;
        n = NOMALIZE({
          x: circ1.pos.x - circ2.pos.x,
          y: circ1.pos.y - circ2.pos.y
        });
      } else {
        isHit = false;
      }
      return new CollisionInfo(isHit, n, meri);
    }

    /*矩形同士*/
    if (e1.collider.shape == SHAPE.BOX && e2.collider.shape == SHAPE.BOX) {
      let box1 = e1.collider.hitbox;
      let box2 = e2.collider.hitbox;

      if (
        box1.pos.x < box2.pos.x + box2.width &&
        box2.pos.x < box1.pos.x + box1.width &&
        box1.pos.y < box2.pos.y + box2.height &&
        box2.pos.y < box1.pos.y + box1.height
      ) {
        //0 ↓ 0   1
        //1 → 1   0
        //2 ↑ 0   -1
        //3 ← -1  0
        let meri = [
          box2.pos.y + box2.height - box1.pos.y,
          box2.pos.x + box2.width - box1.pos.x,
          box1.pos.y + box1.height - box2.pos.y,
          box1.pos.x + box1.width - box2.pos.x
        ];
        let minI = meri.minIndex();
        // 四隅を引く
        //console.log(meri);
        isHit = true;
        switch (minI) {
          case 0:
            n = { x: 0, y: 1 };
            break;
          case 1:
            n = { x: 1, y: 0 };
            break;
          case 2:
            n = { x: 0, y: -1 };
            break;
          case 3:
            n = { x: -1, y: 0 };
            break;
        }
        depth = meri[minI];
      } else {
        isHit = false;
      }
      return new CollisionInfo(isHit, n, depth);
    }

    //線分単体
    if (e1.collider.shape == SHAPE.LINE && e2.collider.shape == SHAPE.LINE) {
      return new CollisionInfo(isHit, n, depth);
    }

    //4つ線分の集合体
    if (e1.collider.shape == SHAPE.LINES && e2.collider.shape == SHAPE.LINES) {
      return new CollisionInfo(isHit, n, depth);
    }
    //どれでもないパターン
    throw new Error("衝突判定がバグってます");
  }

  /*
  
  🍉 衝突応答
  
  */

  /*衝突応答 矩形同士*/
  //e1が呼び出し側
  static Resolve(e1, e2) {
    //console.assert(e1.e != undefined);
    //if(e1.e === undefined)e1.e = 0;
    /*速度*/
    let l = Collision.on(e1, e2);
    //if(l.n.x != 0) e1.vel.x = 0;
    if (l.n.y == -1) e1.vel.y = Math.min(e1.vel.y, 0);
    if (l.n.y == 1) {
      e1.vel.y = Math.max(e1.vel.y, 0);
    }
    //while(Collision.on(e1,e2).isHit){
    e1.pos.x += l.n.x * l.depth;
    e1.pos.y += l.n.y * (l.depth + 0); //0にすると地上での着地判定がトグルしてしまう
    //}
    /*note : now isHit == false*/
  }
}

//衝突判定クラス
class CollisionInfo {
  constructor(isHit, n, depth) {
    this.isHit = isHit; // 衝突したかどうか bool
    this.n = n; //衝突したならば法線
    this.depth = depth; //めり込み量
  }
}
