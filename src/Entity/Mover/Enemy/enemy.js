import Mover from '../mover.js';
import Art from '../../../art.js';
import CollisionShape from '../../../Collision/collisionShape.js';
import Circle from '../../../Collision/circle.js';
import Box from '../../../Collision/box.js';


export default class Enemy extends Mover{
  constructor(pos){
    super(pos,VEC0,VEC0);
    this.type = ENTITY.ENEMY;
    this.AIList = [];//AIの配列
  }

  addAI(AI){
    this.AIList.push(AI);
  }
}
