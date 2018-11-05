import Collision from '../../Collision/collision.js';

export default class BasicEnemyAI{
  constructor(enemy){
    this.enemy = enemy;
  }
  Do(){
    this.enemy.Hurt();
    this.enemy.BasicEnemyPhysics();
  }
}
