export default class TestAI{
  /*enemyの参照を受け取り関数を実行する*/
  constructor(enemy){
    this.enemy = enemy;
  }
  Do(){
    this.enemy.pos.x--;
  }
}
