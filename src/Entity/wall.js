import Art from "../art.js";
import Box from "../Collision/box.js";
import Collider from "../Collision/collider.js";
import Entity from "./entity.js";

export default class Wall extends Entity {
  constructor(pos, wall) {
    super(pos, vec0());
    /*基本情報*/
    //this.name = name; 必要になったら
    this.type = ENTITY.WALL;
    this.layer = "ENTITY";
    this.collider = new Collider(SHAPE.BOX, new Box(pos, 16, 16)); //衝突判定の形状
    this.isUpdater = false;
    /*性質*/
    this.material = wall.material;
    this.colType = wall.colType;
    if (this.colType == "through") {
      this.collider.hitbox.height = 16;
    }
    /*スプライト*/
    this.tex = wall.texture;
    this.sprite = Art.Sprite(this.tex);
    this.sprite.position = pos;
  }
}
