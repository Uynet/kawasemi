import Art from "../../art.js";
import Collision from "../../Collision/collision.js";
import Param from "../../param.js";
import EntityManager from "../../Stage/entityManager.js";
import Pool from "../../Stage/pool.js";
import Enemy from "./enemy.js";

//敵の弾丸その2
export default class eBullet2 extends Enemy {
  constructor(pos, vel) {
    super(pos, vel);
    /*基本情報*/
    this.SetBoxCollider(8, 8);
    this.type = "MOVER";
    this.pattern = Art.enemyPattern.eBullet2;
    this.sprite = Art.CreateSprite(this.pattern[this.spid]); //現在表示中のスプライト
    this.sprite.position = this.pos;
    this.SetParam(Param.eBullet2);

    this.addAnimator(true, 2, 4);
  }
  Collision() {
    for (let w of EntityManager.wallList) {
      let c = Collision.on(this, w);
      //判定は落下中のみ
      if (c.isHit && this.vel.y > 2) {
        this.hp--;
      }
    }
  }
  Update() {
    this.ExecuteAI();
    if (this.Modulo(3)) {
      let stone = Pool.GetStone(add(this.pos, VECX(4)), vec0());
      if (stone) EntityManager.addEntity(stone);
    }
    this.Collision();
    if (this.frame > 300) this.Delete();
  }
}
