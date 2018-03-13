import Entity from './entity.js';
import Art from '../art.js';
import Collider from '../Collision/collider.js';
import Circle from '../Collision/circle.js';
import Box from '../Collision/box.js';
import EntityManaer from '../Stage/entityManager.js';
import MapData from '../Stage/mapData.js';

export default class Wall extends Entity{
  constructor(pos,ID){
    super(pos,VEC0());
    /*基本情報*/
    //this.name = name; 必要になったら
    this.type = ENTITY.WALL;
    this.layer = "ENTITY";
    this.collider = new Collider(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
    this.isUpdater = false;
    /*スプライト*/
    this.tex = MapData.Tile(ID).texture;
    this.material = MapData.Tile(ID).material;
    this.sprite = Art.SpriteFactory(this.tex);
    this.sprite.position = pos;
  }
}
