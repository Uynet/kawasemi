import Art from "../../art.js";
import Pool from "../../Stage/pool.js";
import EFFECT from "./effect.js";

/*bullet1残像*/
export default class BulletBlur extends EFFECT {
  constructor(pos, vel) {
    super(pos, vel);
  }
  Init(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "bulletblur";
    this.frame = 0;
    this.isAlive = true; //消えたらfalse
    /*スプライト*/
    this.spid = 0; //12~15
    this.pattern = Art.bulletPattern.blur;
    this.sprite = Art.Sprite(this.pattern[this.spid]);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 0.5;
    this.sprite.scale = VECN((Rand(0.5) + 1) / 1);
    this.sprite.position = ADV(this.pos, VECN(8));
    //this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }
  Physics() {
    this.pos = ADV(this.pos, this.vel);
    this.vel = MLV(this.vel, VECN(0.9));
  }
  Update() {
    if (this.isAlive) {
      //this.sprite.alpha *= 0.9
      this.sprite.scale = ADV(this.sprite.scale, VECN(this.frame / 256));
      this.sprite.scale.x *= 0.9;
      this.sprite.scale.y *= 0.9;
      this.Physics();
      this.sprite.position = ADV(this.pos.x, VECN(8));
      this.sprite.texture = this.pattern[this.spid];
      this.spid = Math.floor(this.frame / 4);
      if (this.spid >= 6) {
        //消える時に一回だけ呼ばれる
        if (this.isAlive) {
          //EntityManager.removeEntity(this);
          Pool.Remove(this);
          this.isAlive = false;
        }
      }
      this.sprite.position = ADV(this.pos, VECN(8));
      this.frame++;
    }
  }
}
