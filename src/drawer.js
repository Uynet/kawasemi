import Timer from './timer.js';
import EntityManager from './Stage/entityManager.js';
import Input from './input.js';

let PIXI_WIDTH = 800; let PIXI_HEIGHT = 600;
let size = 1; 
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
    this.filterContainer = new PIXI.Container();//画面遷移フィルター
    this.foreContainer = new PIXI.Container();//手前に表示する 文字エフェクトなど
    this.UIContainer = new PIXI.Container();//UI

    this.app.stage.addChild(this.backGroundContainer);
    this.app.stage.addChild(this.backContainer);
    this.app.stage.addChild(this.entityContainer);
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
    this.filterContainer.scale = po;
    $("#pixiview").append(this.Renderer.view);

    //フィルタ
    this.blurFilter = new PIXI.filters.BlurFilter();
    this.blurFilter.blur = 2;
    this.noiseFilter = new PIXI.filters.NoiseFilter(0.5);
    //this.sepia =filter = new PIXI.filters.SepiaFilter();
    //this.tiltShiftFilter = new PIXI.filters.TiltShiftFilter()
    //this.sepiaFilter = new PIXI.filters.SepiaFilter();
    //this.sepiaFilter.sepia = 0.5;

  }

  /*コンテナにスプライトを追加*/
  static addContainer(sprite,CONTAINER,id){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.addChild(sprite);
        break;
      case "FILTER":
        this.filterContainer.addChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.addChild(sprite);
        break;
      case "FORE":
        this.foreContainer.addChild(sprite);
        break;
      case "BACK":
        this.backContainer.addChild(sprite);
        break;
      case "BG":
        this.backGroundContainer.addChild(sprite);
        break;
      default :
        console.warn(CONTAINER);
    }
  }

  /*コンテナからスプライトを削除*/
  static removeContainer(sprite,CONTAINER){//,id){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.removeChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.removeChild(sprite);
        break;
      case "FILTER":
        this.filterContainer.removeChild(sprite);
        break;
      case "FORE":
        this.foreContainer.removeChild(sprite);
        break;
      case "BACK":
        this.backContainer.removeChild(sprite);
        break;
      case "BG":
        this.backGroundContainer.removeChild(sprite);
        break;
      default :
        console.warn("container");
    }
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOn(pos){
    let centerX = BET(-700,this.magnification*(- pos.x-8 + 400/this.magnification),-64);
    let centerY = this.magnification*(- pos.y-8 + 300/this.magnification);
    let toX = this.entityContainer.x + ( centerX - this.entityContainer.x )/8;
    let toY = this.entityContainer.y + ( centerY - this.entityContainer.y )/8;
    //背景レイヤ
    //スクロールが遅い
    this.backGroundContainer.x = toX/4;
    this.backGroundContainer.y = toY/4 % 32;
    //Entityレイヤ
    this.backContainer.x = toX;
    this.backContainer.y = toY;
    this.entityContainer.x = toX;
    this.entityContainer.y = toY;
    this.foreContainer.x = toX*4/3;
    this.foreContainer.y = toY*4/3;
    //UIは動かない

  }
  /*スクロール位置を一瞬で移動させる*/
  static ScrollSet(pos){
    let centerX = this.magnification*(- (pos.x-8) + 400/this.magnification);
    let centerY = this.magnification*(- (pos.y-8) + 300/this.magnification);
    this.backContainer.x = Math.floor(centerX);
    this.backContainer.y = Math.floor(centerY);
    this.entityContainer.x = Math.floor(centerX);
    this.entityContainer.y = Math.floor(centerY);
    this.foreContainer.x = Math.floor(centerX);
    this.foreContainer.y = Math.floor(centerY);
  }

  static Quake(diff){
    this.Stage.x += diff.x;
    this.Stage.y += diff.y;
  }


}
