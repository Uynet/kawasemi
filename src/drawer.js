import Timer from './timer.js';
import EntityManager from './Stage/entityManager.js';

const PIXI_WIDTH = 800;
const PIXI_HEIGHT = 600;

export default class Drawer{

  /*setting stage*/
  static Init(){
    this.app = new PIXI.Application(PIXI_WIDTH, PIXI_HEIGHT, {backgroundColor : 0x000000});
    this.Stage = this.app.stage;
      /* コンテナ(レイヤー)は以下の通り 下から優先して描画される
      /* Entityコンテナ:Entityを描画するレイヤ
       * Effectコンテナ:画面に適用するエフェクトを描画するレイヤ
       * foreGround:手前に描画
       * UIコンテナ:UIを描画するレイヤ
       * */
    this.entityContainer = new PIXI.Container();//Entity
    this.effectContainer = new PIXI.Container();//エフェクト
    this.foreGroundContainer = new PIXI.Container();//手前に表示する
    this.UIContainer = new PIXI.Container();//UI

    this.app.stage.addChild(this.entityContainer);
    this.app.stage.addChild(this.foreGroundContainer);
    this.app.stage.addChild(this.effectContainer);
    this.app.stage.addChild(this.UIContainer);
    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH,PIXI_HEIGHT);


    /*拡大率*/
    this.magnification = 3;
    this.entityContainer.scale.x = this.magnification;
    this.entityContainer.scale.y = this.magnification;
    this.UIContainer.scale.x = this.magnification;
    this.UIContainer.scale.y = this.magnification;
    this.foreGroundContainer.scale.x = this.magnification;
    this.foreGroundContainer.scale.y = this.magnification;
    this.effectContainer.scale.x = this.magnification;
    this.effectContainer.scale.y = this.magnification;
    $("#pixiview").append(this.Renderer.view);

    /*-----*/
    /*なぜかyieldがstaticにできないのでココにかく*/

    this.Animator = function*(start,num,startTime,rate){
      yield (start + Math.floor((Timer.timer - startTime)/rate))%num;
    }
  }

  /*コンテナにスプライトを追加*/
  static addContainer(sprite,CONTAINER,id){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.addChild(sprite);
        break;
      case "ENTITY":
        this.entityContainer.addChild(sprite);
        break;
      case "FILTER":
        this.effectContainer.addChild(sprite);
        break;
      case "FORE":
        console.assert(sprite.id == id);
        this.foreGroundContainer.addChild(sprite);
        break;
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
        this.effectContainer.removeChild(sprite);
        break;
      case "FORE":
        this.foreGroundContainer.removeChild(sprite);
        /*
        console.assert(sprite.id == id);
        if(this.foreGroundContainer.children.length != EntityManager.effectList.length){
          //this.foreGroundContainer.children[0].position.x = 400;
       //   cl("jnvori");
        }
        */
        break;
      default :
        console.warn("container");
    }
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOn(pos){
    let centerX = this.magnification*(- pos.x-8 + 400/this.magnification);
    let centerY = this.magnification*(- pos.y-8 + 300/this.magnification);
    let toX = this.entityContainer.x + ( centerX - this.entityContainer.x )/8;
    let toY = this.entityContainer.y + ( centerY - this.entityContainer.y )/8;
    this.entityContainer.x = Math.floor(toX);
    this.entityContainer.y = Math.floor(toY);
    this.foreGroundContainer.x = Math.floor(toX);
    this.foreGroundContainer.y = Math.floor(toY);
  }
  /*スクロール位置を一瞬で移動させる*/
  static ScrollSet(pos){
    let centerX = this.magnification*(- pos.x-8 + 400/this.magnification);
    let centerY = this.magnification*(- pos.y-8 + 300/this.magnification);
    this.entityContainer.x = Math.floor(centerX);
    this.entityContainer.y = Math.floor(centerY);
    this.foreGroundContainer.x = Math.floor(centerX);
    this.foreGroundContainer.y = Math.floor(centerY);
  }

  static Yakudo(mag){
    this.magnification = mag;
    this.entityContainer.scale.x = this.magnification;
    this.entityContainer.scale.y = this.magnification;
    this.effectContainer.scale.x = this.magnification;
    this.effectContainer.scale.y = this.magnification;
  }


}
