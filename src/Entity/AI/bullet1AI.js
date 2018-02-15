import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Util from '../../util.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Timer from '../../timer.js';

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
            l.Damage(-this.bullet.atk - Math.floor(5*Math.random()) );
            this.bullet.hp--;
            /* ■ SoundEffect : hitWall */
            /* □ Effect : hitWall */
            EntityManager.addEntity(new BulletHitWall(this.bullet.pos,{x:0,y:0}));
          };
          break;
        case ENTITY.WALL :
          if(Collision.on(this.bullet,l).isHit){
            //breakable object
            if(l.name == "woodbox"){
              /* ■ SoundEffect : hitWood */
              l.Damage(-this.bullet.atk );
              this.bullet.hp--;
            //wall
            }else{
              /* ■ SoundEffect : hitWall */
              this.bullet.hp = 0;
            }
            /* □ Effect : hitWall */
            EntityManager.addEntity(new BulletHitWall(this.bullet.pos,{x:0,y:0}));
          };
          break;
      }
    }
  }

  Do(){
    this.collision();
    this.Phisics();
  }
}
