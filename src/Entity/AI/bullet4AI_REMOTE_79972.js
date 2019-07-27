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
    //this.bullet.vi = length(this.bullet.vel)
    this.bullet.vel = fromPolar(this.bullet.arg,this.bullet.vi);
    //this.bullet.vel.y += 0.1;
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
    this.bullet.arg = argument(this.bullet.vel); 
  }
  /* 衝突判定 */
  collision(){
    for(let l of EntityManager.enemyList){
      if(Collision.on(this.bullet,l).isHit){
        if(Dice(30)==1){
          l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        }
  //     this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      };
    }
      for(let w of EntityManager.wallList){
        let c = Collision.on(this.bullet,w);
        if(c.isHit || this.bullet.vel > 0){
          Collision.Resolve(this.bullet,w)
          this.bullet.vel.x = 0;
          //this.bullet.vel = reflect(this.bullet.vel,c.n);
          this.bullet.arg = -Math.PI/2;
        }
      }
  }

  Observer(){
      if(this.bullet.frame > 130) this.bullet.Delete();
  }
  Do(){
    this.Phisics();
    this.collision();
    this.Observer();
    //this.sprite.filters = [Drawer.fireFilter];
    //this.sprite.filters[0].uniforms.frame = this.frame;
    //this.bullet.SetSize(this.bullet.size *1.05);
    this.bullet.sprite.anchor.set(0.5);
    this.bullet.sprite.position = add(this.bullet.pos,vec2(8));
    this.bullet.sprite.rotation = this.bullet.arg + Math.PI/2;
    this.bullet.frame++;
  }
}
