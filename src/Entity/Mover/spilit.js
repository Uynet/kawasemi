import Art from "../../art.js";
import EntityManager from "../../Stage/entityManager.js";
import BasicAI from "../AI/Basic/basicAI.js";
import EmitTrail from "../AI/emitTrail.js";
import Bright from "../Effect/bright.js";
import Entity from "../entity.js";
import Collider from "../../Collision/collider.js";
import Collision from "../../Collision/collision.js";
import Box from "../../Collision/box.js";

let player;
export default class Spilit extends Entity {
  constructor(pos) {
    player = EntityManager.player;
    super(pos, vec0());
    this.type = "MOVER";
    this.name = "spilit";
    this.colType = "none";
    this.material = "none";
    this.pattern = Art.playerPattern.spilit; //
    this.sprite = new PIXI.Sprite(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.layer = "ENTITY";
    this.isUpdater = true;
    this.arg = 0;
    this.collider = new Collider(SHAPE.BOX, new Box(pos, 16, 16));
    this.addAI(new EmitTrail(this, Bright, 8));
    this.addAI(new BasicAI(this));
    this.addAnimator(true, 3, 6);

    this.f = vec0();
    this.absorp = vec0();
    this.repel = vec0();
  }
  SpilitPhisics() {
    this.pos = sub(this.pos, this.force);
    this.pos = add(this.pos, this.f);
    this.pos = add(this.pos, this.repel);
    this.pos = add(this.pos, this.absorp);
    this.pos = add(this.pos, fromPolar(this.arg, 4));
    this.force = scala(0.8, this.force);

    this.collider.hitbox.set(this.pos, 16, 16);
    player = EntityManager.player;
    this.arg = player.arg;
    // 斥力
    this.repel = vec2(
      -(player.pos.x - this.pos.x),
      -(player.pos.y - this.pos.y)
    );
    //引力
    this.absorp = vec2(-this.repel.x, -this.repel.y);
    let len = length(this.repel);
    this.repel = normalize(this.repel);
    const s = Math.min(1,30 / (len * len + 1))
    this.repel = scala(s , this.repel);
    this.absorp = normalize(this.absorp);
    /* Note!
     */
    this.absorp = scala((len * 16) / 50, this.absorp);

    // リサージュ曲線てきなフワフワした動きをする
    this.f = vec2(Math.sin(this.frame / 17), Math.cos(this.frame / 13));
    this.f = scala(2, this.f);
  }
  shot(player) {
    player.weapon.shot(player);
  }
  OnShot() {
    let f;
    f = fromPolar(this.arg, 4);
    switch (player.weapon.name) {
      case "missile":
        f = fromPolar(this.arg, 10);
        break;
      case "laser":
        f = fromPolar(this.arg, 9);
        break;
      case "normal":
        f = fromPolar(this.arg, 7);
        break;
    }
    this.AddForce(f);
  }
  OnCollision(c, e) {
    if (e.name == "player") return;
    if (e.colType == "wall") {
      Collision.Resolve(this, e);
      if (dist(this.pos, EntityManager.player.pos) > 64) {
        this.pos = copy(EntityManager.player.pos);
      }
    }
    if (e.colType == "through") {
      if (c.n.y == -1) Collision.Resolve(this, e);
    }
  }
  Update() {
    this.ExecuteAI();
    this.SpilitPhisics();
  }
}
