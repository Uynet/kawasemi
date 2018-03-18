import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import AI from './ai.js';

let player;

export default class Enemy5AI extends AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    super(enemy)
    this.enemy = enemy;
    player = EntityManager.player;
  }

  Do(){
    if(DIST(this.enemy.pos,player.pos) < 500){
      this.enemy.Activate();
    }else{
      this.enemy.Deactivate();
    }
  }
}
