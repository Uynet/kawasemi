import Explosion from "./explosion.js";
import Stone2 from "./stone2.js";

//爆発エフェクト
export default class Explosion4 extends Explosion {
  constructor(pos, vel) {
    super(pos, vel);
  }
  Bomb() {
    //stone(というか火花?)
    for (let i = 0; i < 4; i++) {
      let arg = Rand(Math.PI);
      let v = fromPolar(arg, 2);
      let stone2 = new Stone2(copy(this.pos), v);
      stone2.addEntity();
    }
    this.Delete();
  }
}
