import Art from "../../art.js";
import EntityManager from "../../Stage/entityManager.js";
import BackEntity from "../backEntity.js";
import Signpop from "../Effect/signpop.js";
import Message from "../../UI/message.js";
import Input from "../../input.js";
import Game from "../../game.js";
import UIManager from "../../UI/uiManager.js";

const POS_MES = vec2(8, 132); //message
const objToArray = obj => {
  const arr = [];
  for (let i in obj) {
    arr.push(obj[i]);
  }
  return arr;
};

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
    this.message = objToArray(message);
    this.page = 0; //現在のページ番号
    this.isRead = false; //会話中かどうか
    /*スプライト*/
    this.tex = Art.wallPattern.signboard;
    this.sprite = Art.Sprite(this.tex);
    this.sprite.position = pos;
    //pop
    let p = copy(this.pos);
    p.y -= 16;
    this.popup = new Signpop(p);
    EntityManager.addEntity(this.popup);
  }
  isCanRead() {
    const player = EntityManager.player;
    return DIST(player.pos, this.pos) < 24 && player.isAlive;
  }
  Update() {
    if (this.isCanRead()) {
      if (Input.isKeyClick(KEY.UP)) {
        Game.state.transit("message");
        UIManager.add(new Message(POS_MES, this)); //枠
      }
    }
    //this.popup.sprite.alpha = this.isCanRead() ? 1 : 0;
    let player = EntityManager.player;
    const d = DIST(player.pos, this.pos);
    this.popup.sprite.alpha = 1 - Math.max(d - 24, 0) / 12;
    this.frame++;
  }
}
