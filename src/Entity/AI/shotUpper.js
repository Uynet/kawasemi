import EntityManager from '../../Stage/entityManager.js';
import Collision from '../../Collision/collision.js';
import Timer from '../../timer.js';

//上に向かって撃つだけ
export default class shotUpper{

  constructor(enemy){
    this.enemy = enemy;
  }
  Do(enemy){
    if(this.enemy.frame%100 == 99){
      this.enemy.Damage(-999);
    }
  }
}
