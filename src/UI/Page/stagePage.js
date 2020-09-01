import UI from "../ui.js";
import GaugeHP from "../gaugeHP.js";
import GaugeBullet from "../gaugeBullet.js";

import Score from "../score.js";

const POS_HP = vec2(8, 0); //HP
const POS_BULLET = vec2(POS_HP.x, POS_HP.y + 16); //bullet
const POS_SCORE = vec2(208, POS_HP.y + 8); //score

export default class StagePage extends UI {
  constructor() {
    super(vec2(0));
    this.type = "StagePage";
    this.addChild(new GaugeHP(POS_HP)); //HP
    this.addChild(new GaugeBullet(POS_BULLET)); //BULLET
    this.addChild(new Score(POS_SCORE)); //SCORE
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
