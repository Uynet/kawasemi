import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import AI from './ai.js';

let player;

export default class Enemy4AI extends AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    super(enemy)
    this.enemy = enemy;
    player = EntityManager.player;
  }

  Do(){
    if(DIST(this.enemy.pos,player.pos) < 100){
    this.enemy.spid = 1;
      this.enemy.vel.x = 0;
      //たまにジャンプする
      if(!this.enemy.isJump && this.enemy.frame % 40 == 0){
        this.enemy.vel.y = -3;
        this.enemy.isJump = true;
      }
      if(this.enemy.isJump)this.enemy.vel.x = (this.enemy.pos.x < EntityManager.player.pos.x)? 0.5 : -0.5;
    }else{
      this.enemy.spid = 0;
    }
  }
}
