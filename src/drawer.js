import Timer from './timer.js';
import EntityManager from './Stage/entityManager.js';
import Input from './input.js';

let PIXI_WIDTH = 800; let PIXI_HEIGHT = 640;
let size = 1; 
let centerX,centerY,toX,toY;
export default class Drawer{

  /*setting stage*/
  static Init(){
    this.app = new PIXI.Application(PIXI_WIDTH, PIXI_HEIGHT, {backgroundColor : 0x000000});
    this.Stage = this.app.stage;
      /* コンテナ(レイヤー)は以下の通り 下から優先して描画される
       * Background
       * Backコンテナ 
       * Entityコンテナ:Entityを描画するレイヤ
       * Effectコンテナ:画面に適用するエフェクトを描画するレイヤ
       * fore:手前に描画
       * UIコンテナ:UIを描画するレイヤ
       * */
    this.backGroundContainer = new PIXI.Container();//背景
    this.backContainer = new PIXI.Container();//backEntity
    this.entityContainer = new PIXI.Container();//Entity
    this.foreEntityContainer = new PIXI.Container();//手前に表示する 文字エフェクトなど
    this.foreContainer = new PIXI.Container();//手前に表示する 文字エフェクトなど
    this.filterContainer = new PIXI.Container();//画面遷移フィルター
    this.UIContainer = new PIXI.Container();//UI

    this.app.stage.addChild(this.backGroundContainer);
    this.app.stage.addChild(this.backContainer);
    this.app.stage.addChild(this.entityContainer);
    this.app.stage.addChild(this.foreEntityContainer);
    this.app.stage.addChild(this.foreContainer);
    this.app.stage.addChild(this.filterContainer);
    this.app.stage.addChild(this.UIContainer);
    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH,PIXI_HEIGHT);


    /*拡大率*/
    this.magnification = 3;
    let po = VECN(this.magnification);
    this.backGroundContainer.scale = po;
    this.backContainer.scale = po;
    this.entityContainer.scale = po;
    this.UIContainer.scale = po;
    this.foreContainer.scale.set(4);
    this.foreEntityContainer.scale = po;
    this.filterContainer.scale = po;
    $("#pixiview").append(this.Renderer.view);

    //フィルタ
    //this.filters = 
    this.blurFilter = new PIXI.filters.BlurFilter();
    this.blurFilter.blur = 2;
    this.noiseFilter = new PIXI.filters.NoiseFilter(0.5);
    //
    this.mapSize = {
      width : 32,
      height : 32,
    }
  }

  /*コンテナにスプライトを追加*/
  static addContainer(sprite,CONTAINER){
    switch (CONTAINER){
      case "UI" : this.UIContainer.addChild(sprite); break;
      case "FILTER": this.filterContainer.addChild(sprite); break;
      case "ENTITY": this.entityContainer.addChild(sprite); break;
      case "FORE": this.foreContainer.addChild(sprite); break;
      case "FOREENTITY": this.foreEntityContainer.addChild(sprite); break;
      case "BACK": this.backContainer.addChild(sprite); break;
      case "BG": this.backGroundContainer.addChild(sprite); break;
      default : console.warn(CONTAINER);
    }
  }

  /*コンテナからスプライトを削除*/
  static removeContainer(sprite,CONTAINER){//,id){
    switch (CONTAINER){
      case "UI" : this.UIContainer.removeChild(sprite); break;
      case "ENTITY": this.entityContainer.removeChild(sprite); break;
      case "FILTER": this.filterContainer.removeChild(sprite); break;
      case "FORE": this.foreContainer.removeChild(sprite); break;
      case "FOREENTITY": this.foreEntityContainer.removeChild(sprite); break;
      case "BACK": this.backContainer.removeChild(sprite); break;
      case "BG": this.backGroundContainer.removeChild(sprite); break;
      default : console.warn("container");
    }
  }

  static SetMap(x,y){
    this.mapSize.width = x;
    this.mapSize.height = y;
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOn(pos){
    centerX = BET(
      this.magnification*(-this.mapSize.width*16 + 134) + 400,
      //10ブロック戻すもどす
      this.magnification*(- pos.x-8) + 400,
      0
    );
    centerY = BET(
      //8ブロックぶん上げる
      this.magnification*(-this.mapSize.height*16 +8*16) + 300,
      this.magnification*(-pos.y-8) + 300,
      0
    );
    toX = this.entityContainer.x + ( centerX - this.entityContainer.x )/8;
    toY = this.entityContainer.y + ( centerY - this.entityContainer.y )/8;
    //背景レイヤ
    //スクロールが遅い
    this.backGroundContainer.x = Math.floor(toX/4 % 256);
    this.backGroundContainer.y = Math.floor(toY/4 % 256);
    //Entityレイヤ
    this.backContainer.x = Math.floor(toX);
    this.backContainer.y = Math.floor(toY);
    this.entityContainer.x = Math.floor(toX);
    this.entityContainer.y = Math.floor(toY);
    this.foreEntityContainer.x = Math.floor(toX);
    this.foreEntityContainer.y = Math.floor(toY);
    this.foreContainer.x = Math.floor(toX*4/3);
    this.foreContainer.y = Math.floor(toY*4/3);
    //UIは動かない

  }
  /*スクロール位置を一瞬で移動させる*/
  static ScrollSet(pos){
    centerX = BET(-700,this.magnification*(- pos.x-8 + 400/this.magnification),-64);
    centerY = this.magnification*(- pos.y-8 + 300/this.magnification);
    this.backContainer.x = Math.floor(centerX);
    this.backContainer.y = Math.floor(centerY);
    this.entityContainer.x = Math.floor(centerX);
    this.entityContainer.y = Math.floor(centerY);
    this.foreEntityContainer.x = Math.floor(centerX);
    this.foreEntityContainer.y = Math.floor(centerY);
    this.foreContainer.x = Math.floor(centerX);
    this.foreContainer.y = Math.floor(centerY);
  }

  static Quake(diff){
    this.Stage.x = Math.floor(diff.x);
    this.Stage.y = Math.floor(diff.y);
  }


}
