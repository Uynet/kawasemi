import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import eBullet1 from '../Enemy/eBullet1.js';
import Audio from '../../audio.js'

//arg方向に向かって発射する

export default class Shot{

  constructor(enemy){
    this.enemy = enemy;
  }
  Do(enemy){
    if(this.enemy.frame - this.enemy.frameShot >= 100){
      Audio.PlaySE("enemy3Shot",-0.7);
      let arg = this.enemy.arg + Rand(0.1);
      let p = copy(this.enemy.pos);
      let d = fromPolar(arg,16);
      p = add(p,d);
      let v = fromPolar(arg,2.0);
      EntityManager.addEntity(new eBullet1(p,v))
      this.enemy.frameShot = this.enemy.frame;
    }
  }
}
