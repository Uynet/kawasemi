import UI from "./ui.js";
import StagePop from "./stagePop.js";
import Game from "../game.js";
import Drawer from "../drawer.js";
import UIManager from "./uiManager.js";
import EntityManager from "../Stage/entityManager.js";
import Art from "../art.js";
import Input from "../input.js";
import Font from "./font.js";
import Component from "./component.js";
import Param from "../param.js";
import shopItemSelectCusor from "./shopItemSelectCusor.js";

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

    this.descriptionTextUI = new Font(
      vec2(0),
      "ここにせつめいぶんがでる",
      "MES"
    );
    this.keyGuideTextUI = new Font(vec2(0), "X:けってい / C:もどる", "MES");
    this.priceTextUI = new Font(vec2(0), "5000G", "MES");
    this.itemList = [];
    const descList = [
      "ミサイル:つよいばくはつ",
      "レーザー:びーむ",
      "ふつう:ふつう",
      "ファイア:ほのおがのこる",
      "バリア:まだじっそうしてない"
    ];
    const priceList = ["30", "100", "0", "200", "5000000000000000"];
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
      ui.globalPos = vec2(0);
    });

    const cusor = new shopItemSelectCusor(this);
    /*SYNTAX
       オリジナルUI記述文法
       [node] : 子を持つノード。名前はstyleで使う
       leaf : このノードが葉であることを宣言、要素のUIがレンダリングされる
       */
    const shopComponent = {
      div: {
        list: {
          leaf1: this.itemList[0],
          leaf2: this.itemList[1],
          leaf3: this.itemList[2],
          leaf4: this.itemList[3],
          leaf5: this.itemList[4]
        },
        leaf: cusor,
        price: {
          leaf: this.priceTextUI
        },
        description: {
          leaf: this.descriptionTextUI
        },
        keyGuide: {
          leaf: this.keyGuideTextUI
        }
      }
    };

    const url = "src/UI/Style/shopStyle.js";
    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(text => {
        const style = eval(text + ";shopStyle");
        const componentTree = shopComponent;
        this.component = new Component(componentTree, style, this, "root");
        this.addChild(this.component);
        this.children.push(this.component);
        this.children.push(cusor);
        cusor.AddPointer(0);
      });
  }
  GetItemList() {
    return this.itemList;
  }
  OnSelectItem(item) {
    this.descriptionTextUI.ChangeText(item.descriptionText);
    this.priceTextUI.ChangeText(item.price);
  }
  Update() {
    //リアクティブにStyleの変更を反映する
    if (isDebugMode) {
      if (this.frame % 600 == 0) {
        const url = "src/UI/Style/shopStyle.js";
        fetch(url)
          .then(function(response) {
            return response.text();
          })
          .then(text => {
            const style = eval(text + ";shopStyle");
            this.component.ResetStyle(style);
          });
      }
    }
    if (this.frame > 1) {
      this.children.forEach(u => u.Update());
      if (Input.isKeyClick(KEY.C)) {
        Game.scene.PopSubState();
        UIManager.removeUI(this);
      }
    }
    this.frame++;
  }
}