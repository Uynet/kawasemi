import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';

export default class horming{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Do(){
    //敵方向へのベクトル
    if(this.bullet.isTargetOn){
      let to = ADV(this.bullet.targetedEnemy.pos , MLV(VECN(-1),this.bullet.pos));
      //外積を取って正負を判定
      let closs = this.bullet.vel.x * to.y - this.bullet.vel.y * to.x; 
      this.bullet.arg += closs/Math.abs(closs) * this.bullet.curve;
    }
  }
}
