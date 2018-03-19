import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Explosion1 from '../Effect/explosion1.js';
import Explosion2 from '../Effect/explosion2.js';

export default class Bullet2AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  /* 衝突判定 */
  collision(){
    for(let l of EntityManager.enemyList){
      if(Collision.on(this.bullet,l).isHit){
        l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      }
    }
    for(let l of EntityManager.wallList){
      if(Collision.on(this.bullet,l).isHit){
        //breakable object
          EntityManager.addEntity(new Explosion2(CPV(this.bullet.pos),this.bullet.arg + Math.PI));
        if(l.isBreakable){
          /* ■ SoundEffect : hitWood */
          l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
          this.bullet.hp--;
          //wall
          }else{
            /* ■ SoundEffect : hitWall */
            this.bullet.hp = 0;
          /* □ Effect : Exp */
          }
      }
    }
  }
  Do(){
    this.collision();
  }
}
