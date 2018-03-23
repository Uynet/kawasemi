import Entity from "./entity.js";
import Art from "../art.js";
import Collider from "../Collision/collider.js";
import Circle from "../Collision/circle.js";
import Box from "../Collision/box.js";
import EntityManaer from "../Stage/entityManager.js";
import MapData from "../Stage/mapData.js";

//背景オブジェクト 何もしない
export default class BackEntity extends Entity{
  constructor(pos,ID){
    super(pos,VEC0());
    this.isUpdater = false;
    this.colType = "none";
    let wall = MapData.Tile(ID)
    this.tex = wall.texture;
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
