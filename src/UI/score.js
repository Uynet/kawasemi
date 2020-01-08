import UI from "./ui.js";
import Art from "../art.js";
import Font from "./font.js";

//score Icon
const POS_ICON = {
  x: 36,
  y: -4
};

export default class Score extends UI {
  constructor(pos) {
    super(pos);
    /*基本情報*/
    this.type = "SCORE";
    //child
    this.icon = { pos: add(pos, POS_ICON) };
    this.value = new Font(pos, "    0", "SCORE"); //数字
    //スプライト
    this.sprite = new PIXI.Container();
    let s;
    //icon
    //s = Art.CreateSprite(Art.UIPattern.score.icon);
    this.pattern = Art.enemyPattern.coin;
    this.iconSprite = Art.CreateSprite(this.pattern[0]);
    this.iconSprite.position = this.icon.pos;
    this.sprite.addChild(this.iconSprite);
    //value
    this.sprite.addChild(this.value.sprite);
  }
  SetScore(score) {
    this.value.SetFont(score);
  }
  Update() {
    //this.value.sprite.position = this.pos
    this.value.Update();
    this.iconSprite.texture = this.pattern[Math.floor(this.frame / 4) % 12];
    //this.iconSprite.texture = this.pattern[Math.floor(Math.sin(this.frame/12)*6)+6];
    this.frame++;
    /*nothing to do*/
  }
}
