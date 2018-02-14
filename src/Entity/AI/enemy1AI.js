import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Timer from '../../timer.js';



export default class Enemy1AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    this.enemy = enemy;
  }

  Do(){
    this.enemy.acc.x = (this.enemy.pos.x < EntityManager.player.pos.x)? 0.01 : -0.01;
    this.enemy.vel.x = Math.min(this.enemy.vel.x,1);
    //たまにジャンプする
    if(!this.enemy.isJump && Timer.timer % (10 + Math.floor(100*Math.random(1))) == 0){
      //this.enemy.acc.y += -3;
      //this.enemy.isJump = true;
    }

    /*observer*/
    if(this.enemy.hp<=0){
      this.enemy.isAlive = false
      EntityManager.removeEntity(this.enemy);
    }
  }

}
