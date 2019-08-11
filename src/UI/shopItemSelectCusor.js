import UIManager from "./uiManager.js";
import Param from "../param.js";
import EntityManager from "../Stage/entityManager.js";
import UI from "./ui.js";
import Input from "../input.js";
import Art from "../art.js";
import StagePop from "./stagePop.js"

export default class shopItemSelectCusor extends UI {
  constructor(shop) {
    super(vec2(0));
    this.pointer = 0;
    this.sprite = new PIXI.Sprite();
    this.sprite.texture = Art.font["↑"];
    this.shop = shop;
    this.AddPointer(0)
  }
  Buy(item) {
    const name = item.name;
    const price = item.price;
    const player = EntityManager.player;
    let p = vec2(96, 32);
    if (price <= player.score) {
      if (!Param.isHaveWeapon(name)) {
        player.GetScore(-price);
        item.changePrice(0);
        Param.GetWeapon(name);
        UIManager.bullet.Push(name);
        UIManager.addUI(new StagePop(p, "-" + name + "をてにいれた ")); //SCORE
      } else {
        UIManager.addUI(new StagePop(p, "-もうもってる! ")); //SCORE
      }
    } else {
      UIManager.addUI(new StagePop(p, "-かえません ")); //SCORE
    }
  }
  GetItemList() {
    return this.shop.GetItemList();
  }
  OnSelectItem(item) {
    this.shop.OnSelectItem(item);
  }
  Update() {
    if (Input.isKeyClick(KEY.RIGHT)) this.AddPointer(1);
    if (Input.isKeyClick(KEY.LEFT)) this.AddPointer(-1);
    if (Input.isKeyClick(KEY.X)) this.Buy(this.pointedItem);
    this.SetPos(this.pos);
  }
  //カーソルの指すindexを移動させる
  AddPointer(i) {
    this.pointer += i;
    this.pointer = clamp(this.pointer, 0, this.GetItemList().length - 1);
    this.pointedItem = this.GetItemList()[this.pointer];
    this.pos = copy(this.pointedItem.pos);
    this.pos.y += 24;
    this.pos.x += 12;
    this.SetPos(this.pos);//このSetPosはcomponentのSetPosの初期化で上書きされるため無効化される
    //これを回避するにはcomponentでSetPosを禁止する必要があり、itemListのクラスを実装する必要がある
    this.OnSelectItem(this.pointedItem);
  }
}
