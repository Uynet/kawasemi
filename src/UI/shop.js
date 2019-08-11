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

    /*SYNTAX
       オリジナルUI記述文法
       [node] : 子を持つノード。名前はstyleで使う
       leaf : このノードが葉であることを宣言、要素のUIがレンダリングされる
    */
    const style = {
      div:{
        margin : vec2(4),
        color:0x212020
      },
      price:{
        margin : vec2(8),
        position : vec2(0.8,0),
        size   : vec2(0.2,0.2),
        color:0x212040
      },
      list:{
        margin : vec2(8),
        size   : vec2(0.5,0.4),
        color:0x212040
      },
      description:{
        position : vec2(0,0.5),
        margin: vec2(8,0),
        size   : vec2(1.0,0.4),
        color:0x212040
      },
      root:{
        margin : mul(vec2(0.05),this.size),
        color:0xd0d0d0
      }
    }

    let text = (new Font(vec2(0),"ここにせつめいぶんがでる","MES"));
    let text_price = (new Font(vec2(0),"5000G","MES"));


    let itemList = []; 
    let descList = [
      "ミサイル:つよいばくはつ",
      "レーザー:びーむ",
      "ふつう:ふつう",
      "ファイア:ほのおがのこる",
      "バリア:まだじっそうしてない"
    ];
    let priceList = [
      "3",
      "5",
      "0",
      "15",
      "5000000000000000"
    ];
    const changePrice = function(p){
        this.price = p;
        cl(p)
    }
    Object.keys(Art.UIPattern.bullet.icon).forEach((e,i)=>{
      let ui = new UI(vec2(0))
      itemList.push( ui ) ;
      ui.sprite = Art.CreateSprite(Art.UIPattern.bullet.icon[e]); 
      ui.descriptionText = descList[i]; 
      ui.price = priceList[i]; 
      ui.name = e;
      changePrice.bind(ui);
      ui.changePrice = changePrice; 
    })

    let cusor = (new Font(vec2(0),"↑","MES"));
    cusor.pointer=0; 
    let f = function(){
      if(Input.isKeyClick(KEY.RIGHT)) this.pointer++;
      if(Input.isKeyClick(KEY.LEFT)) this.pointer--;
      this.pointer = clamp(this.pointer,0,itemList.length);
      const pointedItem = itemList[this.pointer];
      if(Input.isKeyClick(KEY.X)) this.Buy(pointedItem);
      this.pos = copy(pointedItem.pos);
      this.pos.y += 24;
      this.pos.x += 12;
      this.SetPos(this.pos);
      text.ChangeText(pointedItem.descriptionText);
      text_price.ChangeText(pointedItem.price);
    }
    f.bind(cusor)
    cusor.Update = f;

    cusor.Buy = function(item){
      const name = item.name;
      const price = item.price;
      const player = EntityManager.player;
      let p = vec2(96,32)
      if(price<=player.score){
        if(!Param.player.havingWeaponList[name]){
          player.GetScore(-price)
          item.changePrice(0);
          Param.player.havingWeaponList[name] = true;
          UIManager.bullet.Push(name);
          UIManager.addUI(new StagePop(p,"-"+name+"をてにいれた "));//SCORE
        }else{
        UIManager.addUI(new StagePop(p,"-もうもってる! "));//SCORE
        }
      }
      else{
        UIManager.addUI(new StagePop(p,"-かえません "));//SCORE
      }
    }
    this.children.push(cusor);

    const componentTree = {
      div: {
        leaf:cusor,
        list:{
          leaf1 : itemList[0],
          leaf2 : itemList[1],
          leaf3 : itemList[2],
          leaf4 : itemList[3],
          leaf5 : itemList[4],
        },
        price:{
          leaf:text_price
        },
        description:{
          leaf6:text
        }
      }
    };

    const component = new Component(componentTree,style,this,"root");
    this.addChild(component);
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
