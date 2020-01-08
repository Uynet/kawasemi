import ReflectOnCollision from "../AI/ReflectOnCollision.js";
import Enemy from "./enemy.js";

export default class Enemy2 extends Enemy {
  constructor(pos) {
    super(pos, vec0());
    this.name = "enemy2";
    /*パラメータ*/
    this.BasicEnemyInit();
    this.vel = Rand2D(1);
    this.addAI(new ReflectOnCollision(this));
    this.addAnimator(true, 2, 4);
  }
}
