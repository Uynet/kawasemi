import UI from "./ui.js";
import ListUI from "./listUI.js";
import Game from "../game.js";
import Drawer from "../drawer.js";
import Art from "../art.js";
import Input from "../input.js";
import Font from "./font.js";
import Component from "./component.js";
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
    });

    const itemListUI = new ListUI (this.pos,this.itemList);
    const cusor = new shopItemSelectCusor(this);
    /*SYNTAX
       オリジナルUI記述文法
       [node] : 子を持つノード。プロパティ名に対応するスタイルが適用される
       leaf : このノードが葉であることを宣言、要素のUIがレンダリングされる
       */
    const shopComponent = {
      div: {
        price: { leaf: this.priceTextUI },
        list: { leaf:itemListUI, },
        leaf: cusor,
        keyGuide: { leaf: this.keyGuideTextUI },
        description: { leaf: this.descriptionTextUI}
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
        //spriteに親子を持たせるのをやめる
        //this.addChild(this.component);
        this.children.push(this.component)
        cusor.AddPointer(0);
      });
  }
  GetItemList() {
    return this.itemList;
  }
  OnSelectItem(item) {
    this.descriptionTextUI.ChangeText(item.descriptionText);
    this.priceTextUI.ChangeText("ねだん "+item.price);
  }
  Reactive(){
    //リアクティブにStyleの変更を反映する
    if (isDebugMode) {
      if (this.frame % 200 == 199) {
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
  }
  Update() {
    //this.Reactive();
    if (this.frame > 1) {
      if (Input.isKeyClick(KEY.C)) {
        Game.scene.PopSubState();
        this.Remove();
      }
    }
    this.frame++;
  }
}
