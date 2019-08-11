import UI from './ui.js';
import StagePop from './stagePop.js';
import Game from "../game.js";
import Drawer from "../drawer.js";
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Component from "./component.js";
import Param from '../param.js';
import shopItemSelectCusor from './shopItemSelectCusor.js';

const gameSreensize = Drawer.GetGameScreenSize();

export default class Shop extends UI{
  constructor(){
    super(vec0());
    this.type = "SHOP";
    this.sprite = new PIXI.Sprite();
    this.size = vec2(96,32);
    this.size = gameSreensize;

    this.scale = vec2(1);
    this.children = [];

    this.descriptionTextUI = (new Font(vec2(0),"ここにせつめいぶんがでる","MES"));

    this.keyGuideTextUI = (new Font(vec2(0),"X:けってい / C:もどる","MES"));

    this.priceTextUI = (new Font(vec2(0),"5000G","MES"));
    this.itemList = []; 
    /*SYNTAX
       オリジナルUI記述文法
       [node] : 子を持つノード。名前はstyleで使う
       leaf : このノードが葉であることを宣言、要素のUIがレンダリングされる
    */
    const hilight=0xef1f6a
    const main = 0x403080
    const base = 0x100030
    const accent= 0xf3b000

    const style = {
      div:{
        margin : vec2(2),
        color:base
      },
      price:{
        margin : vec2(8),
        position : vec2(0.8,0),
        size   : vec2(0.2,0.2),
        color:main
      },
      list:{
        margin : vec2(8),
        size   : vec2(0.5,0.4),
        color:main
      },
      description:{
        position : vec2(0,0.5),
        margin: vec2(8,0),
        size   : vec2(1.0,0.2),
        color:main
      },
      keyGuide:{
        position : vec2(0.40,0.90),
        margin: vec2(8,0),
        size   : vec2(0.55,0.07),
        color:main
      },
      root:{
        margin : mul(vec2(0.05),this.size),
        color:hilight 
      }
    }

    let descList = [
      "ミサイル:つよいばくはつ",
      "レーザー:びーむ",
      "ふつう:ふつう",
      "ファイア:ほのおがのこる",
      "バリア:まだじっそうしてない"
    ];
    let priceList = [
      "0",
      "5",
      "0",
      "15",
      "5000000000000000"
    ];
    const changePrice = function(p){
        this.price = p;
    }
    Object.keys(Art.UIPattern.bullet.icon).forEach((e,i)=>{
      let ui = new UI(vec2(0))
      this.itemList.push( ui ) ;
      ui.sprite = Art.CreateSprite(Art.UIPattern.bullet.icon[e]); 
      ui.descriptionText = descList[i]; 
      ui.price = priceList[i]; 
      ui.name = e;
      changePrice.bind(ui);
      ui.changePrice = changePrice; 
    })

    let cusor = new shopItemSelectCusor(this);

    const componentTree = {
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
          leaf: this.descriptionTextUI,
        },
        keyGuide:{
            leaf: this.keyGuideTextUI
        } 
      }
    };

    const component = new Component(componentTree,style,this,"root");
    this.addChild(component);
    this.children.push(cusor);
  }
  GetItemList(){
    return this.itemList;
  }
  OnSelectItem(item){
      this.descriptionTextUI.ChangeText(item.descriptionText);
      this.priceTextUI.ChangeText(item.price);
  }
  Update(){
    if(this.frame > 1){
      this.children.forEach(u=>u.Update());
      if(Input.isKeyClick(KEY.C)){
        Game.scene.PopSubState();
        UIManager.removeUI(this);
      }
    }
    this.frame++;
  }
}
