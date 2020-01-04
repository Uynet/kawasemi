import Art from "../../art.js";
import EntityManager from "../../Stage/entityManager.js";
import BackEntity from "../backEntity.js";
import Signpop from "../Effect/signpop.js";
import Input from "../../input.js";
import UIManager from "../../UI/UIManager.js";

export default class Signboard extends BackEntity {
  constructor(pos, message, name) {
    super(pos, Art.wallPattern.signboard);
    this.Init(pos, message, name);
  }
  Init(pos, message, name) {
    this.layer = "ENTITY";
    //TODO:fix
    this.name = name;
    this.isUpdater = true;
    /* 固有情報
     * message : 複数のページからなる文章
     * text : 1つのページの文章
     * sentense : 1行の文章
     * font : 1文字
     * */
    //オブジェクトを配列に変換?
    this.message = [];
    for (let l in message) {
      this.message.push(message[l]);
    }
    this.page = 0; //現在のページ番号
    this.isRead = false; //会話中かどうか
    this.isCanRead = false;
    /*スプライト*/
    if (name == "signboard") this.tex = Art.wallPattern.signboard; //テクスチャ
    if (name == "shop") this.tex = Art.wallPattern.shop; //テクスチャ
    this.sprite = Art.Sprite(this.tex);
    this.sprite.position = pos;
    //pop
    let p = copy(this.pos);
    p.y -= 16;
    this.popup = new Signpop(p);
    EntityManager.addEntity(this.popup);

    const self = this;
    Input.addKeyListenner(this, KEY.X, () => {
      if (self.isCanRead) UIManager.PopMessage(self);
    });
  }
  Update() {
    const player = EntityManager.player;
    this.isCanRead = DIST(player.pos, this.pos) < 16 && player.isAlive;
    this.popup.sprite.alpha = this.isCanRead ? 1 : 0;
    /*
    if (!this.isRead && this.name == "shop" && this.frame % 8 == 0) {
      let trail = new Bright(add(this.pos, Rand2D(16)), Rand2D(0.5));
      EntityManager.addEntity(trail);
    }
    */
    this.frame++;
  }
}
