import UI from "./ui.js";
import Event from "../Event/event.js";
import StagePop from "./stagePop.js";
import UIManager from "./uiManager.js";
import Audio from "../audio.js";
import EntityManager from "../Stage/entityManager.js";
import ListUI from "./listUI.js";
import Drawer from "../drawer.js";
import Art from "../art.js";
import Font from "./font.js";
import Param from "../param.js";
import Component from "./component.js";
import shopController from "./shopController.js";
import BlinkEvent from "../Event/Component/blink.js";
import Game from "../game.js";
//import {shopStyle}from "./Style/shopStyle.js";

const gameSreensize = Drawer.GetGameScreenSize();

//TODO:Implement component
export default class Shop extends UI {
  constructor() {
    super(vec0());
    //Audio.PlaySE("enemy3shot", -0.6);
    Audio.PlaySE("coin2", -0.6, 0.6);
    Audio.PlaySE("stageChange", -0.6, 1.5);
    this.type = "SHOP";
    this.sprite = new PIXI.Sprite();
    this.size = gameSreensize;
    this.children = [];
    this.selectPointerIndex = 0;
    this.stetes = { MAIN: "MAIN", CONFIRM: "CONFIRM" };
    this.state = "MAIN";

    this.descriptionTextUI = new Font(
      vec2(0),
      "ここにせつめいぶんがでる",
      "MES"
    );
    this.itemNameUI = new Font(vec2(0), " おみせ", "MES");
    this.priceTextUI = new Font(vec2(0), " よおこそ", "MES");
    this.keyGuideTextUI = new Font(vec2(0), "X:けってい / C:もどる", "MES");

    this.textUIList = [
      this.itemNameUI,
      this.priceTextUI,
      this.descriptionTextUI,
      this.keyGuideTextUI
    ];
    let i = 0;
    this.textUIList.forEach(t => {
      t.size = t.GetSpriteSize();
      t.Animate(new BlinkEvent(t, { delay: 24 + 2 * i, sus: 8 }));
      i++;
    });

    this.itemList = [];
    const descList = [
      "つよつよミサイル\nあいてはしぬ",
      "つよつよビーム\nコストたかめ",
      "default\nもうもってるよ",
      "めっちゃもえるマン\n",
      "まだじっそうしてない\n5000ちょうえん"
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
    //this.SelectItem(this.itemList[0]);
    this.controller = new shopController(this);
    /*SYNTAX
       オリジナルUI記述文法
       [node] : 子を持つノード。プロパティ名に対応するスタイルが適用される
       leaf : このノードが葉であることを宣言、要素のUIがレンダリングされる
       */
    /*
    const shopComponent = {
      div: {
        leaf :this.controller,
        itemName: this.itemNameUI,
        price: this.priceTextUI,
        list: itemListUI,
        keyGuide: this.keyGuideTextUI,
        description: this.descriptionTextUI
      }
    };
    */
    const shopComponent = {
      div: {
        itemName: { leaf: this.itemNameUI },
        price: { leaf: this.priceTextUI },
        list: { leaf: itemListUI },
        keyGuide: { leaf: this.keyGuideTextUI },
        description: { leaf: this.descriptionTextUI },
        leaf: this.controller
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
        //this.SelectItem(this.GetItemList()[0]);
      });
  }
  GetItemList() {
    return this.itemList;
  }
  //propsを導入して良い感じにしたい
  SelectItem(item) {
    this.descriptionTextUI.ChangeText(item.descriptionText);
    this.priceTextUI.ChangeText("ねだん " + item.price);
    this.itemNameUI.ChangeText(item.name);
    this.itemNameUI.Animate(
      new BlinkEvent(this.itemNameUI, { delay: 0, sus: 3 })
    );
    this.descriptionTextUI.Animate(
      new BlinkEvent(this.descriptionTextUI, { delay: 0, sus: 3 })
    );
  }
  //カーソルの指すindexを移動させる
  //selectPointerIndexは状態に対応
  Controle(input) {
    Audio.PlaySE("landing1", 1.0, 1.5);
    Audio.PlaySE("changeWeapon", -0.8, 1.3);
    if (input == ">") this.selectPointerIndex++;
    else if (input == "<") this.selectPointerIndex--;
    const N = this.GetItemList().length;
    this.selectPointerIndex += N;
    this.selectPointerIndex %= N;
    this.pointedItem = this.GetItemList()[this.selectPointerIndex];
    this.controller.FocusOnItem(this.pointedItem);
    this.SelectItem(this.pointedItem);
  }
  CloseConfirmModal() {
    this.modal.Remove();
    this.state = "MAIN";
    Audio.PlaySE("playerDamage");
  }
  OpenConfirmModal() {
    this.state = "CONFIRM";
    Audio.PlaySE("coin1");
    const YES = new Font(vec0(), "はい", "MES");
    const NO = new Font(vec0(), "いいえ ", "MES");
    const selective = [YES, NO];
    const coin = new UI(vec0());
    coin.sprite = Art.CreateSprite(Art.enemyPattern.coin[4]);
    const modalTree = {
      div: {
        //icon: { leaf: this.pointedItem },
        label: { leaf: new Font(vec0(), "かう?", "MES") },
        price: {
          leaf1: new Font(vec0(), "  " + this.pointedItem.price, "MES"),
          leaf2: coin
        },
        Y: { leaf: selective[0] },
        N: { leaf2: selective[1] }
      }
    };
    const hilight = 0xef1f6a;
    const main = 0x403080;
    const base = 0x100030;
    const accent = 0xf3b000;
    const style = {
      div: {
        margin: vec2(4),
        color: base,
        popin: { ease: bounceOut }
      },
      root: {
        margin: mul(vec2(0.3), gameSreensize),
        color: hilight,
        popin: { delay: 0, ease: easeOutElastic }
      },
      label: { position: vec2(0.4, 0.15) },
      icon: { position: vec2(0.2, 0.1) },
      price: { position: vec2(0.3, 0.3) },
      Y: { position: vec2(0.4, 0.6) },
      N: { position: vec2(0.4, 0.75) }
    };
    this.modal = new Component(modalTree, style, this, "root");
    this.modal.selective = selective;
    this.controller.FocusOnItem(this.modal.selective[0]);
    this.children.push(this.modal);
  }
  Buy() {
    this.state = "MAIN";
    const item = this.pointedItem;
    const name = item.name;
    const price = item.price;
    const player = EntityManager.player;
    let p = vec2(96, 64);
    if (price <= player.score) {
      if (!Param.isHaveWeapon(name)) {
        player.GetScore(-price);
        item.setPrice(0);
        Param.GetWeapon(name);
        UIManager.find("BULLET")[0].bullet.Push(name);
        UIManager.add(new StagePop(p, "-" + name + "をてにいれた "));
        Audio.PlaySE("coin1");
        Audio.PlaySE("bomb", -0.9, 1.6);
        this.CloseConfirmModal();
      }
    } else {
      UIManager.add(new StagePop(p, "-errorー!"));
      Audio.PlaySE("playerDamage");
    }
  }
  Exit() {
    Audio.PlaySE("playerDamage");
    this.Remove();
    this.controller.ui.Remove();
    Game.state.transit("main");
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
