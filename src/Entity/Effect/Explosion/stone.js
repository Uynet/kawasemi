import Art from "../../../art.js";
import EntityManager from "../../../Stage/entityManager.js";
import Pool from "../../../Stage/pool.js";
import EFFECT from "../effect.js";

//火花?
export default class Stone extends EFFECT {
  constructor(pos, vel) {
    super(pos, vel);
  }
  Init(pos, vel) {
    //constructor
    this.pos = pos;
    this.vel = vel;
    /*基本情報*/
    this.name = "stone";
    this.continuasFrame = 0;
    this.frame = 0;
    this.count = 0;
    this.isNext = false;
    /*スプライト*/
    this.spid = 0;
    this.pattern = Art.bulletPattern.explosion.stone;
    this.sprite = Art.CreateSprite(this.pattern[this.spid]);
    this.sprite.texture = this.pattern[this.spid];
    this.sprite.position = this.pos;
    this.sprite.scale.set(1);
    this.sprite.anchor.set(0.5);
    this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
  }

  March() {
    if (this.sprite.alpha > 0 && this.isNext) {
      //生成は最初の一回のみ
      this.isNext = false;
      this.sprite.scale = mul(this.sprite.scale, vec2(0.8));
      let p = add(this.pos, this.vel);
      let stone = Pool.Get("stone", p, this.vel);
      //次の石 : 小さく薄く
      if (stone) {
        stone.sprite.scale = this.sprite.scale;
        stone.sprite.alpha = this.sprite.alpha;
        EntityManager.addEntity(stone);
      }
    }
  }
  Update() {
    this.ExecuteAI();
    this.vel = mul(this.vel, vec2(0.8)); //減速
    this.pos.y += 0.3; //重力??
    //this.pos = Util.advec(this.pos,this.vel);
    this.sprite.alpha -= 0.02;

    if (this.count == 1) this.isNext = true;
    if (this.count > 3) Pool.Remove(this);

    this.count++;
    //再帰
    this.March();
  }
}
