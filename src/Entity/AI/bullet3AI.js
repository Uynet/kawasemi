import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Audio from '../../audio.js'

export default class Bullet3AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    this.bullet.vel = POV(this.bullet.arg,this.bullet.vi);
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  collision(){
    for(let l of EntityManager.enemyList){
      if(Collision.on(this.bullet,l).isHit){
        l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
    for(let w of EntityManager.wallList){
      if(Collision.on(this.bullet,w).isHit){
        //breakable object
        if(w.isBreakable){
          // ■ SoundEffect : hitWood
          w.Damage(-1);
          this.bullet.hp--;
          //wall
          }else{
            // ■ SoundEffect : hitWall
            switch(w.material){
              case  "wall" : Audio.PlaySE("landing1",-1,2);break;
              case  "steel": Audio.PlaySE("landing3",0,2);break;
              }
            this.bullet.hp = 0;
          }
      }
    }
  }

  Do(){
    this.collision();
    this.Phisics();
  }
}
