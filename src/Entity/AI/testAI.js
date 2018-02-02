import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Timer from '../../timer.js';


export default class TestAI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    this.enemy = enemy;
  }

  Collision(){
    /*TODO 敵が潰された時にめり込むのでなんとかする*/
    for(let l of EntityManager.wallList.concat(EntityManager.enemyList)){
      if(l == this.enemy) continue;
      /*衝突判定*/
      if(Collision.on(this.enemy,l).isHit){
        /* 衝突応答*/

        /*速度*/
        if(Collision.on(this.enemy,l).n.x != 0) this.enemy.vel.x = 0;
        if(Collision.on(this.enemy,l).n.y != 0) this.enemy.vel.y *= -0.3;
        /*押し出し*/
        while(Collision.on(this.enemy,l).isHit){
          this.enemy.pos.x += Collision.on(this.enemy,l).n.x/5;
          this.enemy.pos.y += Collision.on(this.enemy,l).n.y/5;
        }
        /*note : now isHit == false*/
      }
    }
  }
  Do(){
    this.Collision();
    this.enemy.acc.x = (this.enemy.pos.x < EntityManager.player.pos.x)? 0.01 : -0.01;
    this.enemy.vel.x = Math.min(this.enemy.vel.x,1);
    this.enemy.acc.y = 0.1;
    if(Timer.timer % (10 + Math.floor(100*Math.random(1))) == 0) this.enemy.vel.y = -3;

    /*observer*/
    if(this.enemy.hp<=0){
      EntityManager.removeEntity(this.enemy);
    }
  }

}
