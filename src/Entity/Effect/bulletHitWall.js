import Art from "../../art.js";
import EFFECT from "./effect.js";

/*bullet1壁にぶつかった時した時のエフェクト*/
export default class BulletHitWall extends EFFECT {
  constructor(pos) {
    super(pos, vec0());
    this.pattern = Art.bulletPattern.hitWall;
    this.BasicEffectInit();
    this.addAnimator(false, 3, 4);
  }
}
