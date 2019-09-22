import Art from "../../art.js";
import EFFECT from "./effect.js";

/*bullet1発射した時のエフェクト*/
export default class BulletShot extends EFFECT {
  constructor(pos, vel) {
    super(pos, vel);
    this.pattern = Art.bulletPattern.shot;
    this.BasicEffectInit();
    this.addAnimator(false, 3, 4);
  }
}
