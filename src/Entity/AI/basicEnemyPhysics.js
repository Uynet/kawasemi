import Collision from '../../Collision/collision.js';

export default class BasicAI{
  constructor(enemy){
    this.enemy = enemy;
  }
  Do(){
    this.enemy.EnemyPhysics();
  }
}
