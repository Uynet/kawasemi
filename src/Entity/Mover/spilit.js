import Art from "../../art.js";
import EntityManager from "../../Stage/entityManager.js";
import BasicAI from "../AI/Basic/basicAI.js";
import EmitTrail from "../AI/emitTrail.js";
import Bright from "../Effect/bright.js";
import Entity from "../entity.js";

let player;
export default class Spilit extends Entity {
  constructor(pos) {
    player = EntityManager.player;
    super(pos, vec0());
    this.type = "MOVER";
    this.name = "spilit";
    this.pattern = Art.playerPattern.spilit; //
    this.sprite = new PIXI.Sprite(this.pattern[this.spid]);
    this.sprite.position = pos;
    this.layer = "ENTITY";
    this.isUpdater = true;
    this.arg = 0;
    this.addAI(new EmitTrail(this, Bright, 8));
    this.addAI(new BasicAI(this));
    this.addAnimator(true, 3, 6);
  }
  SpilitPhisics() {
    player = EntityManager.player;
    this.arg = player.arg;
    let repel = {
      x: -(player.pos.x - this.pos.x),
      y: -(player.pos.y - this.pos.y)
    };
    let absorp = {
      x: -repel.x,
      y: -repel.y
    };
    let len = length(repel);
    repel = normalize(repel);
    repel = scala(30 / (len * len), repel);
    absorp = normalize(absorp);
    absorp = scala((len * len) / 50, absorp);

    let f = {
      x: Math.sin(this.frame / 17),
      y: Math.cos(this.frame / 13)
    };
    f = scala(2, f);
    this.pos = sub(this.pos, this.force);

    this.pos = add(this.pos, f);
    this.pos = add(this.pos, repel);
    this.pos = add(this.pos, absorp);
    this.pos = add(this.pos, fromPolar(this.arg, 4));
    this.force = scala(0.8, this.force);
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
  Update() {
    this.ExecuteAI();
    this.SpilitPhisics();
  }
}
