import Art from "../../art.js";
import EFFECT from "./effect.js";

export default class Bright extends EFFECT {
  constructor(pos, vel) {
    //velが渡されなければ0を渡す
    super(pos, vel);
    /*基本情報*/
    this.pattern = Art.bulletPattern.coin.bright;
    this.BasicEffectInit();
    this.sprite.alpha = 0.7;
    this.addAnimator(false, 3, 4);
  }
}
