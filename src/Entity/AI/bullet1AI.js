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
    this.bullet.vel = POV(this.bullet.arg,this.bullet.vi);
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  collision(){
    /*TODO リスト分割 */
    for(let l of EntityManager.enemyList){
      if(Collision.on(this.bullet,l).isHit){
        l.Damage(-this.bullet.atk - Math.floor(99*Math.random()) );
        this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
        EntityManager.addEntity(new BulletHitWall(this.bullet.pos,VEC0()));
      };
    }
    for(let l of EntityManager.wallList){
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
          /* □ Effect : Exp */
      };
    }
  }

  Do(){
    this.collision();
    this.Phisics();
  }
}
