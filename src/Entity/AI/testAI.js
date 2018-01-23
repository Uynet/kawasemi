import EntityManager from '../../Stage/entityManager.js';

export default class TestAI{
  /*enemyの参照を受け取り関数を実行する*/
  constructor(enemy){
    this.enemy = enemy;
  }
  Do(){
    this.enemy.pos.x--;
    /*observer*/
    if(this.enemy.hp<=0){
      this.enemy.hp = 1;
      EntityManager.removeEntity(this.enemy);
    }
  }

}
