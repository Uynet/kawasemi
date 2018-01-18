const PIXI_WIDTH = 800;
const PIXI_HEIGHT = 600;

export default class Drawer{

  /*setting stage*/
  static Init(){
    this.app = new PIXI.Application(PIXI_WIDTH, PIXI_HEIGHT, {backgroundColor : 0x000000});
    this.Stage = this.app.stage;
    /*コンテナ*/
    this.entityContainer = new PIXI.Container();//Entity
    this.effectContainer = new PIXI.Container();//エフェクト
    this.UIContainer = new PIXI.Container();//UI

      /*ここでレイヤーの上下関係が決まる*/
    this.app.stage.addChild(this.entityContainer);
    this.app.stage.addChild(this.effectContainer);
    this.app.stage.addChild(this.UIContainer);
    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH,PIXI_HEIGHT);

    /*拡大方式をニアレストネイバーに*/
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    /*拡大率*/
    this.magnification = 2;
    this.entityContainer.scale.x *= this.magnification;
    this.entityContainer.scale.y *= this.magnification;
    this.UIContainer.scale.x *= this.magnification;
    this.UIContainer.scale.y *= this.magnification;
    this.effectContainer.scale.x *= this.magnification;
    this.effectContainer.scale.y *= this.magnification;
    $("#pixiview").append(this.Renderer.view);
  }

  /*コンテナにスプライトを追加*/
  static addContainer(sprite,CONTAINER){
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
    }
  }

  /*コンテナからスプライトを削除*/
  static removeContainer(sprite,CONTAINER){
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
    }
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOnPlayer(player){
    let centerX = this.magnification*(- player.pos.x + 200);
    let centerY = this.magnification*(- player.pos.y + 150);
    this.entityContainer.x = this.entityContainer.x + ( centerX - this.entityContainer.x )/8;
    this.entityContainer.y = this.entityContainer.y + ( centerY - this.entityContainer.y )/8;
    if(this.entityContainer.x%2==1)this.entityContainer.x--;
    if(this.entityContainer.y%2==1)this.entityContainer.y--;
  }

}
