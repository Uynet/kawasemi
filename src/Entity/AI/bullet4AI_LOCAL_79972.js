import Collision from "../../Collision/collision.js";
import EntityManager from "../../Stage/entityManager.js";

export default class Bullet4AI {
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet) {
    this.bullet = bullet;
  }
  Phisics() {
    //this.bullet.vi *= 0.9;
    //this.bullet.vi = length(this.bullet.vel)
    //this.bullet.vel = POV(this.bullet.arg,this.bullet.vi);
    this.bullet.vel.y += 0.1;
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
    this.bullet.arg = argument(this.bullet.vel);
  }
  /* 衝突判定 */
  collision() {
    for (let l of EntityManager.enemyList) {
      if (Collision.on(this.bullet, l).isHit) {
        if (Dice(30) == 1) {
          l.Damage(-RandBET(this.bullet.atkMin, this.bullet.atkMax));
        }
        //     this.bullet.hp--;
        /* ■ SoundEffect : hitWall */
        /* □ Effect : hitWall */
      }
    }
    for (let w of EntityManager.wallList) {
      let c = Collision.on(this.bullet, w);
      if (c.isHit || this.bullet.vel > 0) {
        Collision.Resolve(this.bullet, w);
        this.bullet.vel.x = 0;
        //this.bullet.vel = reflect(this.bullet.vel,c.n);
        this.bullet.arg = -Math.PI / 2;
      }
    }
  }

  Do() {
    this.Phisics();
    this.collision();
  }
}
