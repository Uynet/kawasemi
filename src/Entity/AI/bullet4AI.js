import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Audio from '../../audio.js'

export default class Bullet4AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    this.bullet.vi *= 0.9;
    this.bullet.vel = POV(this.bullet.arg,this.bullet.vi);
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  collision(){
    for(let l of EntityManager.enemyList){
      if(Collision.on(this.bullet,l).isHit){
        if(Dice(10)==1){
          l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        }
  //     this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
      for(let w of EntityManager.wallList){
        let c = Collision.on(this.bullet,w);
        if(c.isHit){
          //  this.bullet.hp = 0;
          //this.bullet.vi = 0;
        }
      }
  }

  Do(){
    this.Phisics();
    this.collision();
  }
}
