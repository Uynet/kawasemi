import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Timer from '../../timer.js';



export default class Enemy2AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    this.enemy = enemy;
  }

  Do(){
    if(this.enemy.frame%800 < 400){
      this.enemy.acc.x = 0.1;
    }else{
      this.enemy.acc.x = -0.1;
    }
    this.enemy.vel.x = Math.min(this.enemy.vel.x,0.5);
    this.enemy.vel.x = Math.max(this.enemy.vel.x,-0.5);
    //たまにジャンプする
  }
}
