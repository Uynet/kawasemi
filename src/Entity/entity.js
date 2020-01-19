import Box from "../Collision/box.js";
import Collider from "../Collision/collider.js";
import EventManager from "../Event/eventmanager.js";
import EntityManager from "../Stage/entityManager.js";
import Timer from "../timer.js";
import Animator from "./AI/animator.js";

export default class Entity {
  constructor(pos, vel) {
    /*phys*/
    this.pos = pos;
    this.vel = vel;
    this.acc = vec0();
    this.force = vec0();
    this.gravity;
    this.size = 16;
    //this.e = 0.9;
    /*standard*/
    this.frame = 0;
    this.continuasFrame = 0;
    this.spid = 0;
    this.type = "MOVER"; //最も深い階層に書いたもので上書きされる
    //this.collider;
    //this.isUpdater = true;
    //this.isMultiple;
    /*sprite*/
    //this.sprite;
    //this.container;
    /*未実装*/
    this.layer;
    /* Other */
    this.AIList = [];
  }
  /*common*/
  Physics() {}
  BasicPhysics() {
    let t = Timer.GetTimeScale();
    this.acc.x += this.force.x * t;
    this.acc.y += this.force.y * t;
    this.vel.x += this.acc.x * t;
    this.vel.y += this.acc.y * t;
    this.pos.x += this.vel.x * t + (this.acc.x / 2) * t * t;
    this.pos.y += this.vel.y * t + (this.acc.y / 2) * t * t;
    this.acc.y = 0;
    this.acc.x = 0;
  }
  MoveByGravity() {
    if (this.gravity) this.acc.y += this.gravity;
  }
  MoveOnFloor() {
    //動く床に乗っている時
    if (this.floor.on) {
      this.pos.x += this.floor.under.vel.x * Timer.GetTimeScale();
      this.pos.y += this.floor.under.vel.y * Timer.GetTimeScale();
    }
  }
  Collision() {}
  Update() {
    this.ExecuteAI();
  }
  Set(param, value) {
    this[param] = value;
  }
  SetSize(size) {
    this.size = size;
    this.sprite.scale.set(this.size / 16);
    this.collider = new Collider(
      SHAPE.BOX,
      new Box(this.pos, this.size, this.size)
    ); //衝突判定の形状
  }
  AddForce(f) {
    this.force.x = f.x * Timer.GetTimeScale();
    this.force.y = f.y * Timer.GetTimeScale();
  }
  ExecuteAI() {
    for (let AI of this.AIList) {
      AI.Do();
    }
  }
  Delete() {
    EntityManager.removeEntity(this);
  }
  addEntity() {
    EntityManager.addEntity(this);
  }
  addAI(AI) {
    //check
    this.AIList.forEach(ai => {
      if (AI == ai) console.warn("AIが重複しています:" + entity.name);
    });
    this.AIList.push(AI);
  }
  addAnimator(isLoop, term, frames) {
    this.addAI(new Animator(this, isLoop, term, frames));
  }
  onAnimationEnd() {
    this.Delete();
  }
  SetParam(param) {
    Object.keys(param).forEach(key => {
      this[key] = param[key];
    });
  }
  SetBoxCollider(width, height) {
    this.collider = new Collider(SHAPE.BOX, new Box(this.pos, width, height)); //衝突判定の形状
  }
  Modulo(term) {
    if (this.frame % term == term - 1) {
      if (Math.floor(this.continuasFrame - Timer.GetTimeScale()) != this.frame)
        return true;
    }
    return false;
  }
  Quake(time, size, isRot) {
    EventManager.Quake(time, size, isRot);
  }
  OnCollision(colInfo, entity) {}
}
