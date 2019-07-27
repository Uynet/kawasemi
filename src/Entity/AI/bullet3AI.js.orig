import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Audio from '../../audio.js'


export default class Bullet3AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  /* 衝突判定 */
  Collision(){
    for(let collider of EntityManager.colliderList){
      if(collider.type == ENTITY.PLAYER)continue;
      if(Collision.on(this.bullet,collider).isHit){
        this.bullet.OnCollision(collider);
      };
    }
  }
  Observer(){
    if(this.bullet.frame > 30) this.bullet.hp = 0;
  }
  Do(){
    this.Collision();
    this.bullet.SetArg();
    this.Observer();
  }
}
