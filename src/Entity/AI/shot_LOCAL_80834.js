import Audio from "../../audio.js";
import EntityManager from "../../Stage/entityManager.js";
import eBullet1 from "../Enemy/eBullet1.js";

//arg方向に向かって発射する

export default class Shot {
  constructor(enemy) {
    this.enemy = enemy;
  }
  Do(enemy) {
    if (this.enemy.frame - this.enemy.frameShot >= 100) {
      Audio.PlaySE("enemy3Shot", -0.7);
      let arg = this.enemy.arg + Rand(0.1);
      let p = CPV(this.enemy.pos);
      let d = POV(arg, 16);
      p = ADV(p, d);
      let v = POV(arg, 2.0);
      EntityManager.addEntity(new eBullet1(p, v));
      this.enemy.frameShot = this.enemy.frame;
    }
  }
}
