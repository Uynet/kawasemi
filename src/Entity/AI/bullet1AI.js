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
            l.Damage(-this.bullet.atk - Math.floor(99*Math.random()) );
            this.bullet.hp--;
            /* ■ SoundEffect : hitWall */
            /* □ Effect : hitWall */
            EntityManager.addEntity(new BulletHitWall(this.bullet.pos,VEC0()));
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
            EntityManager.addEntity(new BulletHitWall(this.bullet.pos,VEC0()));
          };
          break;
      }
    }
  }
  Horming(){
    this.bullet.vel = {
      x: this.bullet.vi * Math.cos(this.bullet.arg),
      y: this.bullet.vi * Math.sin(this.bullet.arg),
    };
    //敵方向へのベクトル
    let to = ADV(this.bullet.targetedEnemy.pos , MLV(VECN(-1),this.bullet.pos));
    //外積を取って正負を判定
    let closs = this.bullet.vel.x * to.y - this.bullet.vel.y * to.x; 
    if(closs>0) this.bullet.arg += this.bullet.curve;
    else if(closs<-0) this.bullet.arg -= this.bullet.curve;
  }

  Do(){
this.Horming();
    this.collision();
    this.Phisics();
  }
}
