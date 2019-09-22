import Effect from "../../Effect/effect.js";

export default class Explosion extends Effect {
  constructor(pos, vel) {
    super(pos, vel);
    this.isNoSprite = true;
    this.GunPowder = [];
    //微妙に左上に寄ってるので中心に
    this.pos = add(this.pos, vec2(8));
  }
  //火薬玉に詰める
  Pack(e) {
    this.GunPowder.push(e);
  }
  diffuse(amp) {
    let rand = Rand2D(amp);
    let diffuse = add(rand, this.pos);
    return diffuse;
  }
  Update() {
    this.Bomb();
  }
}
