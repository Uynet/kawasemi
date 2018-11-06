import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Audio from '../../audio.js'
import Bullettrail2 from '../Effect/bullettrail2.js';


export default class Bullet3AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    this.bullet.vel = fromPolar(this.bullet.arg,this.bullet.vi);
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  collision(){
    for(let enemy of EntityManager.enemyList){
      if(Collision.on(this.bullet,enemy).isHit){
        enemy.Damage( -RandomRange(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
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
              case  "steel": Audio.PlaySE("landing3",4,2);break;
              }
            this.bullet.hp = 0;
          }
      }
    }
  }

  Observer(){
    if(this.bullet.hp<=0 ||
      this.bullet.frame > 30) {
      EntityManager.removeEntity(this.bullet);
      EntityManager.addEntity(new BulletHitWall(copy(this.bullet.pos)));
    }
  }
  Do(){
    this.collision();
    this.Phisics();
    this.Observer();

    this.bullet.sprite.position = add(this.bullet.pos,vec2(8));
    this.bullet.sprite.rotation = this.bullet.arg + Math.PI/2;
    this.bullet.frame++;
  }
}
