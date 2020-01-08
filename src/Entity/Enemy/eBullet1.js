import Art from "../../art.js";
import Collision from "../../Collision/collision.js";
import Param from "../../param.js";
import EntityManager from "../../Stage/entityManager.js";
import Enemy from "./enemy.js";

//敵の弾丸その1
export default class eBullet1 extends Enemy {
  constructor(pos, vel) {
    super(pos, vel);
    /*基本情報*/
    this.SetBoxCollider(8, 8);
    this.type = "MOVER";
    /*スプライト*/
    this.pattern = Art.enemyPattern.eBullet1;
    this.sprite = Art.CreateSprite(this.pattern[this.spid]); //現在表示中のスプライト
    this.sprite.position = this.pos;
    this.SetParam(Param.eBullet1);
    this.addAnimator(true, 2, 4);
  }
  Collision() {
    for (let w of EntityManager.wallList) {
      let c = Collision.on(this, w);
      if (c.isHit) {
        this.hp = 0;
      }
    }
  }
  Update() {
    this.ExecuteAI();
    this.Collision();
    if (this.frame > 300) this.Delete();
  }
}
