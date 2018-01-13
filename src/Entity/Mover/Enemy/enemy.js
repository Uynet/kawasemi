import Mover from '../mover.js';
import Art from '../../art.js';
import CollisionShape from '../Collision/collisionShape.js';
import Circle from '../../Collision/circle.js';
import Box from '../../Collision/box.js';


export default class Enemy extends Mover{
  constructor(pos){
    super(pos);
    this.type = ENTITY.ENEMY;
    this.sprite = Art.SpriteFactory(Art.teki1Texture);
    this.sprite.position = pos;
    this.collisionShape = new CollisionShape(SHAPE.BOX,new Box(pos,16,16));//衝突判定の形状
      this.ai;//AIの配列
  }
  Update(){
    /*nothing to do*/
  }
}
