import EFFECT from "./effect.js";
import Art from "../../art.js";
import EntityManager from "../../Stage/entityManager.js";
import Drawer from "../../drawer.js";
import Animator from "../AI/animator.js";

export default class Signpop extends EFFECT {
  constructor(pos) {
    super(pos, vec0());
    /*基本情報*/
    this.name = "signpop";
    /*スプライト*/
    //this.pattern = Art.bulletPattern.signpop;
    this.pattern = Art.UIPattern.key.X;
    this.BasicEffectInit();
    //this.addAnimator(true, 4, 4);
  }
}
