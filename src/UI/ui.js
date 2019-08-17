import UIManager from "./uiManager.js";

export default class UI {
  constructor(pos) {
    this.frame = 0;
    this.sprite = new PIXI.Sprite();
    this.pos = copy(pos);
    this.sprite.position.x = this.pos.x;
    this.sprite.position.y = this.pos.y;
    this.type; //enum
    this.isUpdater = true;
    this.children = [];
    this.eventList = [];
  }
  Delete() {
    UIManager.removeUI(this);
  }
  Animate(event) {
    this.eventList.push(event);
  }
  SetPos(pos) {
    this.pos = copy(pos);
    this.sprite.position.x = this.pos.x;
    this.sprite.position.y = this.pos.y;
  }
  SetParent(parent) {
    if (this.parent !== undefined)
      console.warn("親がもうすでにあるんだけど", this.parent);
    this.parent = parent;
  }
  setFilter(f) {
    this.sprite.filters = [f];
  }
  Add() {
    UIManager.addUI(this);
  }
  Update() {}
  GetSpriteSize() {
    if (this.sprite !== undefined) {
      if (this.sprite.texture !== undefined) {
        return vec2(this.sprite.texture.width, this.sprite.texture.height);
      }
    }
    return vec2(0);
  }
  //子持ちSpriteは親の座標変換が子にも適用されるため色々面倒なことが発生する
  //そのためSprite自体に親子を持たせることを避け、modelが親子を持つようにする
  addChild(ui) {
    this.sprite.addChild(ui.sprite); //TODO:Modelとviewを完全に分離する(この行を消す)
    this.children.push(ui); //こっちはModelなので残す
  }
  //子供丸ごと消す
  Remove() {
    UIManager.removeUI(this);
    this.children.forEach(u => u.Remove());
  }
  ExecuteEvent() {
    //アニメーションイベント
    for (let e of this.eventList) {
      if (e.Do().done) this.eventList.remove(e);
    }
  }
}
