import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Util from '../../util.js';
import BulletHitWall from '../bulletHitWall.js';

export default class Bullet1AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    let EntityList = EntityManager.entityList;
    for(let l of EntityList){
      switch(l.type){
        case ENTITY.ENEMY :
          if(Collision.on(this.bullet,l).isHit){
            l.hp-=this.bullet.atk;
            this.bullet.hp = 0;
            /* ■ SoundEffect : hitWall */
            /* □ Effect : hitWall */
            EntityManager.addEntity(new BulletHitWall(this.bullet.pos,{x:0,y:0}));
          }
          break;
 case ENTITY.WALL :
   if(Collision.on(this.bullet,l).isHit){
     this.bullet.hp = 0;
     /* ■ SoundEffect : hitWall */
     /* □ Effect : hitWall */
     EntityManager.addEntity(new BulletHitWall(this.bullet.pos,{x:0,y:0}));
   }
   break;
      }
    }
  }

  Do(){
    this.collision();
    this.Phisics();
    /*observer*/
    //HP || 飛行距離
    if(this.bullet.hp<=0 ||
      Util.distance(this.bullet.pos , this.bullet.launchedPos) > this.bullet.length){
      EntityManager.removeEntity(this.bullet);
    }
    this.bullet.sprite.position = this.bullet.pos;
  }
}
