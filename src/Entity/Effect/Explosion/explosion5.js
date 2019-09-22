import EventManager from "../../../Event/eventmanager.js";
import ScreenFlashEvent from "../../../Event/screenFlashEvent.js";
import Explosion from "./explosion.js";
import Explosion1 from "./explosion1.js";
import ScreenFlash from "./screenFlash.js";

//爆発エフェクト
export default class Explosion5 extends Explosion {
  constructor(pos, vel) {
    super(pos, vel);
  }
  Bomb() {
    let exp = new Explosion1(copy(this.pos));
    exp.addEntity();
    this.Delete();
  }
  ScreenFlash() {
    EventManager.PushEvent(new ScreenFlashEvent(this.pos));
    let screenFlash = new ScreenFlash(copy(this.pos));
    screenFlash.addEntity();
  }
  Update() {
    if (this.frame == 0) this.ScreenFlash();
    if (this.frame == 4) this.Bomb();
    this.frame++;
  }
}
