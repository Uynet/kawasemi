import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';



export default class Enemy2AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    this.enemy = enemy;
  }

  Collision(){
    /*衝突判定*/
    for(let l of EntityManager.wallList){
      if(l == this.enemy) continue;
      /*衝突判定*/
      let c = Collision.on(this.enemy,l);
      if(c.isHit){
        /* 衝突応答*/

        /*速度*/
        if(c.n.x != 0) {
          this.enemy.vel.x  *= -1; 
        }
        //地面との衝突
        if(c.n.y == -1){ 
          this.enemy.isJump = false;
          this.enemy.vel.y *= -1;
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.enemy.vel.y *= -1;
        }
        /*押し出し*/
        this.enemy.pos.x += c.n.x * c.depth;
        this.enemy.pos.y += c.n.y * c.depth;
        /*note : now isHit == false*/
      }
    }
    // 敵同士の衝突
    this.enemy.floor.on  =false ;
    this.enemy.floor.under = null;
    for(let i=0;i<EntityManager.enemyList.length;i++){
      let l = EntityManager.enemyList[i];
      let c = Collision.on(this.enemy,l);
      //これないと自分と衝突判定してバグ
      if(i == EntityManager.enemyList.indexOf(this.enemy))continue;
      //衝突判定
      if(c.isHit){
        // 衝突応答

        //壁との衝突
        if(c.n.x != 0){
          this.enemy.vel.x *= -1; 
        }
        //地面との衝突
        if(c.n.y == -1){ 
          this.enemy.floor.on = true;
          this.enemy.floor.under = EntityManager.enemyList[i];
          this.enemy.isJump = false;
          this.enemy.vel.y *= -1;
        }
        //天井との衝突
        if(c.n.y == 1 ){
          this.enemy.vel.y *= -1;
        }
        //押し出し
        let l = EntityManager.enemyList[i];
        this.enemy.pos.x += c.n.x * c.depth/2;
        this.enemy.pos.y += c.n.y * c.depth/2;
        //note : now isHit == false
      }
    }
  }
  Do(enemy){
    this.Collision();
  }
}
