import Entity from './entity.js';
import Art from '../art.js';
import CollisionShape from '../Collision/collisionShape.js';
import Circle from '../Collision/circle.js';


export default class Wall extends Entity{
  constructor(pos){
    super(pos);
    this.type = ENTITY_TYPE.WALL;
    this.sprite = Art.SpriteFactory(Art.teki1Texture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape(SHAPE.CIRCLE,new Circle(pos,16));//衝突判定の形状
  }
  updatePosition(){
    /*nothing to do*/
  }
}
