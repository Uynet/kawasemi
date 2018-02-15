import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Timer from '../../timer.js';



export default class Enemy2AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    this.enemy = enemy;
  }

  Do(){
    if(this.enemy.frame%100 == 0){
      this.enemy.vel.y = -2;
    }
    if(this.enemy.frame%100 == 50){
      this.enemy.vel.y = 2;
    }
    if(this.enemy.frame%100 == 25){
      this.enemy.vel.x = 2;
    }
    if(this.enemy.frame%100 == 75){
      this.enemy.vel.x = -2;
    }
    //たまにジャンプする
  }
}
