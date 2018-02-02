import Mover from './mover.js';
import Art from '../art.js';
import CollisionShape from '../Collision/collisionShape.js';
import Circle from '../Collision/circle.js';
import Box from '../Collision/box.js';


export default class Enemy extends Mover{
  constructor(pos,vel){
    super(pos,vel);
    this.type = ENTITY.ENEMY;
    this.hp = 1;
    this.AIList = [];//AIの配列
  }

  addAI(AI){
    this.AIList.push(AI);
  }
}
