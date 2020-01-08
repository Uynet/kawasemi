import Audio from "../../audio.js";
import eBullet2 from "../../Entity/Enemy/eBullet2.js";
import EntityManager from "../../Stage/entityManager.js";
import ReflectOnCollision from "../AI/ReflectOnCollision.js";
import SetActiveRange from "../AI/setActiveRange.js";
import Enemy from "./enemy.js";

export default class Enemy5 extends Enemy {
  constructor(pos) {
    super(pos, vec0());
    /*基本情報*/
    this.name = "enemy5";
    this.BasicEnemyInit();
    this.vel.x = -0.5;
    /*フラグ*/
    this.isActive = false;
    /*AI*/
    this.addAI(new SetActiveRange(this, 200));
    this.addAI(new ReflectOnCollision(this));
  }

  ActiveAI() {
    if (this.frame % this.term == 0) {
      let p = copy(this.pos);
      p = add(p, VECX(4)); //弾は中心から
      let v = {
        x: 0,
        y: -1
      };
      let b = new eBullet2(p, v);
      EntityManager.addEntity(b);
      Audio.PlaySE("enemy5Shot");
    }
  }
  Update() {
    this.ExecuteAI();
    if (this.isActive) {
      this.spid = 1;
      this.ActiveAI();
    } else {
      this.spid = 0;
      this.frame = 0;
    }
  }
}
