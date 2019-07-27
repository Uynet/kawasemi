import EntityManager from '../../Stage/entityManager.js';
import Pool from "../../Stage/pool.js";
import Collision from '../../Collision/collision.js';
import Audio from '../../audio.js';
import EventManager from "../../Event/eventmanager.js";
import Explosion1 from "../Effect/Explosion/explosion1.js";
import Explosion4 from "../Effect/Explosion/explosion4.js";
import BulletShot from "../Effect/bulletShot.js";

export default class Bullet1AI{
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
    if(this.bullet.frame > 180){
      this.bullet.Delete();
    }
  }
  Do(){
    this.Collision();
    this.bullet.SetArg();
    this.Observer();
  }
}
