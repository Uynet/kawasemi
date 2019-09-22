import EntityManager from "../../Stage/entityManager.js";
import EFFECT from "./effect.js";
import Stone2 from "./stone2.js";

//爆発エフェクト
export default class Explosion4 extends EFFECT {
  constructor(pos, vel) {
    super(pos, vel);
    //微妙に左上に寄ってるので中心に
    this.pos = ADV(this.pos, VECN(8));
    /*基本情報*/
    this.frame = 0;
    this.isNoSprite = true;
  }
  Bomb() {
    //stone(というか火花?)
    for (let i = 0; i < 4; i++) {
      let arg = Rand(Math.PI);
      let v = POV(arg, 2);
      let stone2 = new Stone2(CPV(this.pos), v);
      EntityManager.addEntity(stone2);
    }
  }

  Update() {
    //爆発して自分は消える
    if (this.frame == 0) {
      this.Bomb();
    }
    if (this.frame > 300) EntityManager.removeEntity(this);
    this.frame++;
  }
}
