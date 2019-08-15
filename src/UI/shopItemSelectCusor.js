import UIManager from "./uiManager.js";
import Audio from "../audio.js";
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
    this.pattern = Art.bulletPattern.target;
    this.sprite.texture = this.pattern[0];
    this.shop = shop;
    this.AddPointer(0)
  }
  Buy(item) {
    const name = item.name;
    const price = item.price;
    const player = EntityManager.player;
    let p = vec2(112 ,28);
    if (price <= player.score) {
      if (!Param.isHaveWeapon(name)) {
        player.GetScore(-price);
        item.setPrice(0);
        Param.GetWeapon(name);
        UIManager.bullet.Push(name);
        UIManager.addUI(new StagePop(p, "-" + name + "をてにいれた "));
        Audio.PlaySE("coin1");
      } else {
        UIManager.addUI(new StagePop(p, "-もうもってる! ")); //SCORE
        Audio.PlaySE("playerDamage");
      }
    } else {
      UIManager.addUI(new StagePop(p, "-かえません ")); //SCORE
      Audio.PlaySE("playerDamage");
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
    this.sprite.anchor.set(0.5);
    this.sprite.rotation = this.frame/50;
    this.sprite.scale = vec2(1.5 + 1.5/(this.frame+1)); //ゼロ除算回避
    this.frame ++;
  }
  //カーソルの指すindexを移動させる
  AddPointer(i) {
    Audio.PlaySE("targetOn");
    this.pointer += i;
    this.pointer = clamp(this.pointer, 0, this.GetItemList().length - 1);
    this.pointedItem = this.GetItemList()[this.pointer];
    this.pos = copy(this.pointedItem.pos);
    this.pos.x += 8;
    this.pos.y += 8;
    this.SetPos(this.pos);//このSetPosはcomponentのSetPosの初期化で上書きされるため無効化される
    //これを回避するにはcomponentでSetPosを禁止する必要があり、itemListのクラスを実装する必要がある
    this.OnSelectItem(this.pointedItem);
    this.frame = 0;
  }
}
