import Entity from "../entity.js";
import EntityManager from "../../Stage/entityManager.js";
import Art from "../../art.js";
import Collider from "../../Collision/collider.js";
import Box from "../../Collision/box.js";
import Collision from "../../Collision/collision.js";

// entity to generate event
export default class EventTrigger extends Entity {
  constructor(pos) {
    super(pos);
    this.layer = "ENTITY";
    this.pattern = Art.enemyPattern["enemy4"];
    this.sprite = Art.Sprite(this.pattern[0]); //現在表示中のスプライト
    this.sprite.texture = this.pattern[0];
    this.sprite.position = this.pos;
    const size = 16;
    this.collider = new Collider(SHAPE.BOX, new Box(this.pos, size, size));
    this.isUpdater = true;
  }
  Collision() {
    const player = EntityManager.player;
    let c = Collision.on(this, player);
    if (c.isHit) this.OnCollision(c, player);
  }
  OnCollision(collisionInfo, player) {}
  Update() {
    this.Collision();
  }
}
