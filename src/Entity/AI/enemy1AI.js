import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Explosion1 from "../Effect/explosion1.js";
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
    //たまにジャンプする
    if(this.enemy.isWait && (this.enemy.frame % 100 == 19)){

      EventManager.PushEvent(new QuakeEvent(10,0.99));
      this.enemy.vel.y = -0.2;
      this.enemy.acc.y = -2.3;
      this.enemy.isWait = false;
      this.enemy.isJump = true;
      let p = ADV(this.enemy.pos,VEC2(-20,90));
    //  Audio.PlaySE("enemy5Shot");
    Audio.PlaySE("landing2",1.6);
    }
    if(this.enemy.isJump){
      this.enemy.acc.x = (this.enemy.pos.x+this.enemy.size/2 < EntityManager.player.pos.x)? 0.010 : -0.010;
      this.enemy.vel.x = Math.max(-1,Math.min(this.enemy.vel.x,1));
    }
  }
  Landing(){
    this.enemy.acc.x = 0;
    EventManager.PushEvent(new QuakeEvent(40,0.97));
    Audio.PlaySE("missileHit",2);
  }
}
