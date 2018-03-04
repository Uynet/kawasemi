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
    for(let l of EntityManager.enemyList){
      if(Collision.on(this.bullet,l).isHit){
        l.Damage(-this.bullet.atk - Math.floor(99*Math.random()) );
        this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
    for(let w of EntityManager.wallList){
      if(Collision.on(this.bullet,w).isHit){
        //breakable object
        if(w.name == "woodbox"){
          // ■ SoundEffect : hitWood
          w.Damage(-this.bullet.atk );
          this.bullet.hp--;
          //wall
          }else{
            // ■ SoundEffect : hitWall
            this.bullet.hp = 0;
          }
      }
    }
    /*
    //壁との判定を二分探索
    let l = EntityManager.wallList.length;
    let m = Math.floor(l/2);//判別位置
    let d = Math.floor(m/2);//移動距離
    
    //broad phase
    for(let i = 0;i<20;i++){
      let w = EntityManager.wallList[m];
      if(!w){
        cl(m);
      }
      //上半分
      if(this.bullet.pos.y < w.pos.y - 16){
        m -= d;
        if(m<0)break;
        d = Math.floor(d/2);
        continue;
      }else if(this.bullet.pos.y > w.pos.y){
      //下半分
        m += d;
        if(m >= l){
          m = l-1;
          break;
        }
        d = Math.floor(d/2);
        continue;
      }else{
        //narrow phase
        //衝突?
        for(let j = 0;j<20;j++){
          if(Collision.on(this.bullet,w).isHit){
            //breakable object
            if(w.name == "woodbox"){
              // ■ SoundEffect : hitWood
              w.Damage(-this.bullet.atk );
              this.bullet.hp--;
              //wall
              }else{
                // ■ SoundEffect : hitWall
                this.bullet.hp = 0;
              }
              // □ Effect : Exp
              break;
          }else{
            m = Math.max(m-1,0) ;
            w = EntityManager.wallList[m];
          }
        }
      }
    }
    */
  }

  Do(){
    this.collision();
    this.Phisics();
  }
}
