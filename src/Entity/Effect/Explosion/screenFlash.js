import Art from "../../../art.js";
import EFFECT from "../effect.js";

//閃光
export default class ScreenFlash extends EFFECT {
  constructor(pos, vel) {
    super(pos, vel);
    this.Init(pos, vel);
  }
  Init(pos, vel) {
    /*基本情報*/
    this.frame = 0;
    this.name = "flash";
    this.layer = "FOREENTITY";
    /*スプライト*/
    this.pattern = Art.bulletPattern.screenFlash;
    this.sprite = Art.SpriteFactory(this.pattern[this.spid]);
    this.sprite.position = this.pos;
    this.sprite.anchor.set(0.5);
  }
  Scaling() {
    this.sprite.scale.x = (4 - this.frame) * 4;
    this.sprite.scale.y = this.frame * 2;
  }
  Update() {
    //this.ExecuteAI();
    this.Scaling();
    this.sprite.texture = this.pattern[this.spid];
    this.spid = (this.spid + 1) % 2;
    if (this.frame == 4) this.Delete();
    this.frame++;
  }
}
