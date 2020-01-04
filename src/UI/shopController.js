import UI from "./ui.js";
import Param from "../param.js";
import UIManager from "./uiManager.js";
import Input from "../input.js";
import Art from "../art.js";
import Event from "../Event/event.js";
import EntityManager from "../Stage/entityManager.js";
import StagePop from "./stagePop.js";
import Audio from "../audio.js";
import Game from "../game.js";

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
    //this.sprite.rotation = this.frame / 50;
    this.frame++;
  }
}
export default class shopController extends UI {
  constructor(shop) {
    super(vec2(0));
    this.selectPointerIndex = 0;
    this.shop = shop;
    this.ui = new Cusor(shop); //view
    this.focusedItem;
  }
  Add() {
    this.ui.Add();
  }
  FocusOnItem(item) {
    if (this.shop.state == "MAIN") this.ui.FocusOn(item);
    else if (this.shop.state == "CONFIRM") {
      this.shop.modal.selective.forEach(i => {
        i.sprite.alpha = 0.5;
      });
      item.sprite.alpha = 1.0;
    }
    this.focusedItem = item;
  }
  //はい/いいえを選択
  ControleConfirm() {
    const i = this.shop.modal.selective.indexOf(this.focusedItem);
    if (Input.isKeyClick(KEY.C)) {
      this.shop.CloseConfirmModal(); //キャンセル
    }
    if (Input.isKeyClick(KEY.X)) {
      if (i == 0) this.shop.Buy(); //はい
      if (i == 1) this.shop.CloseConfirmModal(); //いいえ
    }
    if (
      Input.isKeyPress(KEY.UP) ||
      Input.isKeyPress(KEY.DOWN) ||
      Input.isKeyPress(KEY.RIGHT) ||
      Input.isKeyPress(KEY.LEFT)
    ) {
      Audio.PlaySE("changeWeapon", -0.4);
      Audio.PlaySE("landing1", 1.0, 1.5);
      let i = this.shop.modal.selective.indexOf(this.focusedItem);
      const item = this.shop.modal.selective[(i + 1) % 2];
      this.FocusOnItem(item);
    }
  }
  ControleMain() {
    if (Input.isKeyPress(KEY.RIGHT) || Input.isKeyPress(KEY.DOWN))
      this.shop.Controle(">");
    if (Input.isKeyPress(KEY.LEFT) || Input.isKeyPress(KEY.UP))
      this.shop.Controle("<");
    if (Input.isKeyClick(KEY.X)) {
      const item = this.shop.pointedItem;
      let p = vec2(96, 64);
      //もう持ってる
      if (Param.isHaveWeapon(item.name)) {
        UIManager.add(new StagePop(p, "-もうもってる! ")); //SCORE
        Audio.PlaySE("playerDamage");
      } else if (item.price > EntityManager.player.score) {
        //金が足りないので変えない
        const pop = new StagePop(p, "-かえません ");
        UIManager.add(new StagePop(p, "-かえません "));
        Audio.PlaySE("playerDamage");
      } else {
        //確認モーダル
        this.shop.OpenConfirmModal();
      }
    }
    if (Input.isKeyPress(KEY.C)) this.shop.Exit();
    this.ui.Update();
  }
  Update() {
    if (this.shop.state == "CONFIRM") this.ControleConfirm();
    else if (this.shop.state == "MAIN") this.ControleMain();
  }
}
