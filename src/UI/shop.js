import UI from "./ui.js";
import Event from "../Event/event.js";
import StagePop from "./stagePop.js";
import UIManager from "./uiManager.js";
import Audio from "../audio.js";
import EntityManager from "../Stage/entityManager.js";
import ListUI from "./listUI.js";
import Game from "../game.js";
import Drawer from "../drawer.js";
import Art from "../art.js";
import Font from "./font.js";
import Param from "../param.js";
import Component from "./component.js";
import shopController from "./shopController.js";
//import {shopStyle}from "./Style/shopStyle.js";

const gameSreensize = Drawer.GetGameScreenSize();

//TODO:Implement component
export default class Shop extends UI {
  constructor() {
    super(vec0());
    this.type = "SHOP";
    this.sprite = new PIXI.Sprite();
    this.size = gameSreensize;
    this.children = [];
    this.selectPointerIndex = 0;

    this.descriptionTextUI = new Font(
      vec2(0),
      "ここにせつめいぶんがでる",
      "MES"
    );
    this.keyGuideTextUI = new Font(vec2(0), "X:けってい / C:もどる", "MES");
    this.priceTextUI = new Font(vec2(0), " よおこそ", "MES");
    this.itemList = [];
    const descList = [
      "ミサイル:つよいばくはつ",
      "レーザー:びーむ",
      "ふつう:ふつう",
      "ファイア:ほのおがのこる",
      "バリア:まだじっそうしてない"
    ];
    let priceList = ["30", "100", "0", "200", "5000000000000000"];
    if (isDebugMode) priceList = ["0", "100", "0", "200", "5000000000000000"];
    const setPrice = function(p) {
      this.price = p;
    };
    Object.keys(Art.UIPattern.bullet.icon).forEach((e, i) => {
      let ui = new UI(vec2(0));
      this.itemList.push(ui);
      ui.sprite = Art.CreateSprite(Art.UIPattern.bullet.icon[e]);
      ui.descriptionText = descList[i];
      ui.price = priceList[i];
      ui.name = e;
      setPrice.bind(ui);
      ui.setPrice = setPrice;
    });

    const itemListUI = new ListUI(this.pos, this.itemList);
    this.pointedItem = this.itemList[0];
    this.SelectItem(this.itemList[0]);
    this.controller = new shopController(this);
    /*SYNTAX
       オリジナルUI記述文法
       [node] : 子を持つノード。プロパティ名に対応するスタイルが適用される
       leaf : このノードが葉であることを宣言、要素のUIがレンダリングされる
       */
    const shopComponent = {
      div: {
        price: { leaf: this.priceTextUI },
        list: { leaf: itemListUI },
        leaf: this.controller,
        keyGuide: { leaf: this.keyGuideTextUI },
        description: { leaf: this.descriptionTextUI }
      }
    };
    const url = "src/UI/Style/shopStyle.js";
    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(text => {
        const style = eval(text + ";style");
        const componentTree = shopComponent;
        this.component = new Component(componentTree, style, this, "root");
        this.children.push(this.component);
        this.controller.FocusOnItem(this.GetItemList()[0]);
      });
  }
  GetItemList() {
    return this.itemList;
  }
  SelectItem(item) {
    this.descriptionTextUI.ChangeText(item.descriptionText);
    this.priceTextUI.ChangeText("ねだん " + item.price);
  }
  //カーソルの指すindexを移動させる
  //selectPointerIndexは状態に対応
  Controle(input) {
    Audio.PlaySE("targetOn");
    if (input == ">") this.selectPointerIndex++;
    else if (input == "<") this.selectPointerIndex--;
    const N = this.GetItemList().length;
    this.selectPointerIndex += N;
    this.selectPointerIndex %= N;
    this.pointedItem = this.GetItemList()[this.selectPointerIndex];
    this.controller.FocusOnItem(this.pointedItem);
    this.SelectItem(this.pointedItem);
  }
  Buy() {
    const item = this.pointedItem;
    const name = item.name;
    const price = item.price;
    const player = EntityManager.player;
    let p = vec2(128, 42);
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
  Exit() {
    Game.scene.PopSubState();
    this.Remove();
    this.controller.ui.Remove();
  }
  Update() {
    if (this.frame > 1) this.controller.Update();
    this.ExecuteEvent();
    this.frame++;
  }
}
class OutShopEvent extends Event {
  constructor(shop) {
    super();
    let frame = 0;
    function* gen() {
      while (frame < 50) {
        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}
