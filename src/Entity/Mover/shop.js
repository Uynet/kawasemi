import Art from "../../art.js";
import Input from "../../input.js";
import EntityManager from "../../Stage/entityManager.js";
import BasicAI from "../AI/Basic/basicAI.js";
import BackEntity from "../backEntity.js";
import Bright from "../Effect/bright.js";
import Signpop from "../Effect/signpop.js";
import Game from "../../game.js";

export default class Shop extends BackEntity {
  constructor(pos) {
    super(pos, 0);
    /*基本情報*/
    this.layer = "ENTITY";
    this.name = "shop";
    this.isUpdater = true;

    /*スプライト*/
    this.pattern = Art.wallPattern.shop;
    this.sprite = Art.CreateSprite(this.pattern[0]);
    this.sprite.position = pos;
    //pop
    let p = copy(this.pos);
    p.y -= 16;
    this.popup = new Signpop(p);
    EntityManager.addEntity(this.popup);
    //AI
    this.addAI(new BasicAI(this));
  }
  isCanRead() {
    let player = EntityManager.player;
    return DIST(player.pos, this.pos) < 24 && player.isAlive;
  }
  Bright() {
    if (this.Modulo(8)) {
      let trail = new Bright(add(this.pos, Rand2D(16)), Rand2D(0.5));
      trail.addEntity();
    }
  }
  Update() {
    this.ExecuteAI();
    if (Input.isKeyClick(KEY.X))
      if (this.isCanRead()) Game.state.transit("shop");
    //this.popup.sprite.alpha = this.isCanRead() ? 1 : 0;
    let player = EntityManager.player;
    const d = DIST(player.pos, this.pos);
    this.popup.sprite.alpha = 1 - Math.max(d - 24, 0) / 12;
    this.frame++;
  }
}
