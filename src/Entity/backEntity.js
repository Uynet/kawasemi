import Art from "../art.js";
import Entity from "./entity.js";

//背景オブジェクト 何もしない
export default class BackEntity extends Entity {
  constructor(pos, wall) {
    super(pos, vec0());
    this.isUpdater = false;
    this.colType = "none";
    this.tex = wall.texture;
    this.sprite = Art.Sprite(this.tex);
    this.sprite.position = pos;
  }
}
