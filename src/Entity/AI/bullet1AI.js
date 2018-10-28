import EntityManager from '../../Stage/entityManager.js';
import Pool from "../../Stage/pool.js";
import Collision from '../../Collision/collision.js';
import BulletHitWall from '../Effect/bulletHitWall.js';
import Audio from '../../audio.js';
import EventManager from "../../Event/eventmanager.js";
import QuakeEvent from "../../Event/quakeEvent.js";
import Explosion1 from "../Effect/explosion1.js";

export default class Bullet1AI{
  /*bulletの参照を受け取り関数を実行する*/
  constructor(bullet){
    this.bullet = bullet;
  }
  Phisics(){
    this.bullet.Set("vel", POV(this.bullet.arg,this.bullet.vi));
    this.bullet.pos.x += this.bullet.vel.x;
    this.bullet.pos.y += this.bullet.vel.y;
  }
  /* 衝突判定 */
  Collision(){
    for(let l of EntityManager.enemyList){
      if(Collision.on(this.bullet,l).isHit){
        l.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
        this.bullet.hp--;
      };
    }
    for(let w of EntityManager.wallList){
      if(Collision.on(this.bullet,w).isHit){
        //breakable object
        if(w.isBreakable){
          // ■ SoundEffect : hitWood
          w.Damage(-RandBET(this.bullet.atkMin,this.bullet.atkMax));
          this.bullet.hp--;
          //wall
          }else{
            // ■ SoundEffect : hitWall
            if(w.material == "steel")Audio.PlaySE("landing3",5);
            this.bullet.hp = 0;
          }
      }
    }
  }

  Observer(){
    if(this.bullet.hp<=0){
      EntityManager.removeEntity(this.bullet);
      Audio.PlaySE("missileHit",1);
      EventManager.eventList.push(new QuakeEvent(50,0.8));//ゆれ
      EntityManager.addEntity(new Explosion1(CPV(this.bullet.pos)));
    }
    if(this.bullet.frame > 180){
      EntityManager.removeEntity(this.bullet);
      EntityManager.addEntity(new BulletShot(CPV(this.bullet.pos)));
    }
  }
  Do(){
    this.Collision();
    this.Phisics();
    this.Observer();
    this.bullet.sprite.position = ADV(this.bullet.pos,VECN(8));
    this.bullet.sprite.rotation = this.bullet.arg + Math.PI/2;
    this.bullet.frame++;
  }
}
