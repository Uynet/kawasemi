import EFFECT from "../effect.js";

//爆発エフェクト
export default class Explosion3 extends EFFECT {
  constructor(pos, vel) {
    super(pos, vel);
    //微妙に左上に寄ってるので中心に
    this.pos = add(this.pos, vec2(8));
    /*基本情報*/
    this.frame = 0;
    //this.isNoSprite = true;
    let texture = new PIXI.Graphics();
    this.color = 0x9295b0;
    this.size = 0;
    texture.beginFill(this.color);
    texture.drawCircle(0, 0, 16);
    texture.endFill();
    this.sprite = texture;
    this.sprite.position = this.pos;
    this.sprite.scale.set(1);
  }
  Update() {
    let d = (5 - this.size) * 0.1;
    this.size += d;
    this.sprite.scale.set(this.size);
    let t = (this.frame - 200) / 100;
    this.sprite.alpha = lerp(0, 1, t);

    if (this.frame > 300) this.Delete();
    this.frame++;
  }
}
