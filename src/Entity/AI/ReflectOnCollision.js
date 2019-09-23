import Collision from "../../Collision/collision.js";
import EntityManager from "../../Stage/entityManager.js";

export default class ReflectOnCollision {
  /*enemyの参照を受け取り関数を実行する*/

  constructor(enemy) {
    this.enemy = enemy;
  }

  OnCollision(colInfo, collider) {
    const originalVel = copy(this.enemy.vel);
    Collision.Resolve(this.enemy, collider); //resolve内でvelが0にされてしまうため
    this.enemy.vel = reflect(originalVel, colInfo.n);
  }
  Collision() {
    /*衝突判定*/
    for (let collider of EntityManager.colliderList) {
      if (collider.type == ENTITY.PLAYER) continue;
      if (collider == this.enemy) continue;
      /*衝突判定*/
      let colInfo = Collision.on(this.enemy, collider);
      if (colInfo.isHit) {
        this.OnCollision(colInfo, collider);
      }
    }
  }
  Do(enemy) {
    this.Collision();
  }
}
