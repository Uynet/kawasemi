import AI from "../ai.js";

export default class Enemy1AI extends AI{
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy){
    super(enemy)
  }

  Do(){
    //this.enemy.vel.x = Math.max(-1,Math.min(this.enemy.vel.x,1));
  }
}
