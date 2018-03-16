import EntityManager from '../../Stage/entityManager.js';
import AI from './ai.js';
import Collision from '../../Collision/collision.js';

//リサージュ曲線で移動
export default class MoveLissajous extends AI{

  constructor(enemy){
    super(enemy);
  }
  Do(enemy){
    this.enemy.vel.x = 1*Math.sin(this.enemy.frame/10);
    this.enemy.vel.y = 1*Math.cos(this.enemy.frame/8);
  }
}
