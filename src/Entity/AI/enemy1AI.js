import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Explosion1 from "../Effect/Explosion/explosion1.js";
import QuakeEvent from '../../Event/quakeEvent.js';
import EventManager from '../../Event/eventmanager.js';
import Audio from '../../audio.js';
import Enemy1 from "../Enemy/enemy1.js";
import Enemy2 from "../Enemy/enemy2.js";
import Enemy3 from "../Enemy/enemy3.js";
import Enemy4 from "../Enemy/enemy4.js";
import Enemy5 from "../Enemy/enemy5.js";
import Enemy6 from "../Enemy/enemy6.js";
import AI from './ai.js';



export default class Enemy1AI extends AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    super(enemy)
  }

  Do(){
    //this.enemy.vel.x = Math.max(-1,Math.min(this.enemy.vel.x,1));
  }
}
