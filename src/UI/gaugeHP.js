import Font from "./font.js";
import Param from "../param.js";
import Gauge from "./gauge.js";

const POS_VALUE = {
  x: 22,
  y: 4
};
//HP Icon
const POS_ICON = {
  x: -16,
  y: 0
};
const POS_BAR = {
  x: -3.5,
  y: 1
};

export default class GaugeHP extends Gauge {
  constructor(pos) {
    super(pos);
    /*基本情報*/
    this.type = "HP";
    this.name = "HP";
    this.width = 62;
    this.height = 12;
    /*パラメータ*/
    this.maxGaugeValue = Param.player.maxHp;
    this.color = 0xbb2e5d;
    /*child*/
    this.outer = { pos: copy(pos) };
    this.bar = { pos: add(copy(pos), POS_BAR) };
    this.icon = { pos: add(pos, POS_ICON) };
    this.value = new Font(add(pos, POS_VALUE), " " + this.maxGaugeValue, "HP"); //数字
    /*スプライト*/
    this.sprite = new PIXI.Container();
    this.InitChildren();
  }
}
