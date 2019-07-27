import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';

export default class Horming{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Do(){
    //敵方向へのベクトル
    if(this.bullet.isTargetOn){
      let to = add(this.bullet.targetedEnemy.pos , mul(vec2(-1),this.bullet.pos));
      //外積を取って正負を判定
      let closs = this.bullet.vel.x * to.y - this.bullet.vel.y * to.x; 
      this.bullet.Set("arg",this.bullet.arg + closs/Math.abs(closs) * this.bullet.curve);
      //これめっちゃ楽しい
      //this.bullet.targetedEnemy.vel.x += this.bullet.vel.x;
      //this.bullet.targetedEnemy.vel.y += this.bullet.vel.y;
      //this.bullet.Set("vel", add(to,this.bullet.vel)); 
      
    }
  }
}
