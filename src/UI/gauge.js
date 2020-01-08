import UI from "./ui.js";
import Art from "../art.js";

export default class Gauge extends UI {
  constructor(pos) {
    super(pos);
  }
  CreateChild(childName) {
    const pattern = Art.UIPattern[this.name];
    let sprite = Art.CreateSprite(pattern[childName]);
    sprite.position = this[childName].pos;
    this.sprite.addChild(sprite);
  }
  InitChildren() {
    let sprite;
    this.CreateChild("outer"); //outer
    //bar
    let rect = new PIXI.Graphics();
    rect.beginFill(this.color);
    rect.drawRect(this.bar.pos.x, this.bar.pos.y, this.width, this.height);
    rect.endFill();
    sprite = rect;
    sprite.position = this.bar.pos;
    this.barSprite = sprite;
    this.sprite.addChild(sprite);
    //icon
    this.CreateChild("icon");
    //value
    this.sprite.addChild(this.value.sprite);
  }
  SetMaxGaugeValue(value) {
    this.maxGaugeValue = value;
  }
  SetBar(value) {
    //barの長さを更新
    this.barSprite.scale.x = value / this.maxGaugeValue;
    //数字の更新
    this.value.SetFont(value);
  }
  Update() {
    this.sprite.position.x = this.pos.x;
  }
}
