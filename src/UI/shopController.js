import UI from "./ui.js";
import Input from "../input.js";
import Art from "../art.js";
import Event from "../Event/event.js";
import UIManager from "./uiManager.js";

class PoyoEvent extends Event {
  constructor(ui) {
    super(1);
    let frame = 0;
    const ease = x => {
      return 1.5 + 1.5 / (x * 50 + 1);
    };
    const sustain = 50;
    function* gen() {
      while (frame <= sustain) {
        ui.sprite.anchor.set(0.5);
        ui.sprite.scale = vec2(ease(frame / sustain));
        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}
class Cusor extends UI {
  constructor(shop) {
    super(vec2(0));
    this.pointer = 0;
    this.sprite = new PIXI.Sprite();
    this.pattern = Art.bulletPattern.target;
    this.sprite.texture = this.pattern[0];
    this.shop = shop;
  }
  FocusOn(item) {
    this.pos = copy(item.pos);
    this.pos.x += 8;
    this.pos.y += 8;
    this.SetPos(this.pos); //初回呼び出し時点ではitemにスタイルが適用
    this.Animate(new PoyoEvent(this));
  }
  Update() {
    this.SetPos(this.pos);
    this.ExecuteEvent();
    this.sprite.rotation = this.frame / 50;
    this.frame++;
  }
}
export default class shopController extends UI {
  constructor(shop) {
    super(vec2(0));
    this.selectPointerIndex = 0;
    this.shop = shop;
    this.ui = new Cusor(shop); //view
  }
  Add() {
    this.ui.Add();
  }
  FocusOnItem(item) {
    this.ui.FocusOn(item);
  }
  Update() {
    if (Input.isKeyClick(KEY.RIGHT)) this.shop.Controle(">");
    if (Input.isKeyClick(KEY.LEFT)) this.shop.Controle("<");
    if (Input.isKeyClick(KEY.X)) this.shop.Buy();
    if (Input.isKeyClick(KEY.C)) this.shop.Exit();
    this.ui.Update();
  }
}
