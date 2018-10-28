import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Explosion1 from '../Effect/Explosion/explosion1.js';
import Explosion2 from '../Effect/Explosion/explosion2.js';

export default class Bullet2AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Observer(){
    if( this.bullet.frame > 20 || this.bullet.hp<=0){
      EntityManager.removeEntity(this.bullet);
    }
  }
  Do(){
    this.Observer();
    this.bullet.sprite.position = ADV(this.bullet.pos,VECN(8));
    this.bullet.sprite.position.x -=4;
    this.bullet.sprite.rotation = this.bullet.arg;

    this.bullet.frame++;
  }
}
