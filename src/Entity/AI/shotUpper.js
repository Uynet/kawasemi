import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Timer from '../../timer.js';
import eBullet1 from '../Enemy/eBullet1.js';

//上に向かって撃つだけ
export default class shotUpper{

  constructor(enemy){
    this.enemy = enemy;
  }
  Do(enemy){
    if(this.enemy.frame%100 == 99){
      let p = CPV(this.enemy.pos);
      p.y -= 16;
      let v = VECY(-1);
      EntityManager.addEntity(new eBullet1(p,v))
    }
  }
}
