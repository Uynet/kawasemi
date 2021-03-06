import EntityManager from "../../Stage/entityManager.js";
import AI from "./ai.js";

let player;

export default class SetActiveRange extends AI {
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy, dist) {
    super(enemy);
    this.enemy = enemy;
    this.dist = dist;
    player = EntityManager.player;
  }

  Do() {
    if (DIST(this.enemy.pos, player.pos) < this.dist) {
      this.enemy.isActive = true;
    } else {
      this.enemy.isActive = false;
    }
  }
}
