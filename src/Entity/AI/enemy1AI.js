import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import AI from './ai.js';



export default class Enemy1AI extends AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    super(enemy)
  }

  Do(){
    this.enemy.acc.x = (this.enemy.pos.x < EntityManager.player.pos.x)? 0.01 : -0.01;
    this.enemy.vel.x = Math.max(-1,Math.min(this.enemy.vel.x,1));
    //たまにジャンプする
    if(!this.enemy.isJump && this.enemy.frame % (10 + Math.floor(100*Math.random())) == 0){
      this.enemy.acc.y += -3;
      this.enemy.isJump = true;
    }
  }
}
