import Art from "../art.js";
import Entity from "./entity.js";

//真の背景であり背景オブジェクトではない
export default class BackEntity extends Entity {
  constructor(pos, tex) {
    super(pos, vec0());
    this.layer = "BG";
    this.isUpdater = false;
    this.tex = tex;
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.scale = vec2(2);
    this.sprite.position = pos;
  }
}
