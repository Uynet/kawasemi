const PIXI_WIDTH = 800;
const PIXI_HEIGHT = 600;

export default class Drawer{

  /*setting stage*/
  static Init(){
    this.app = new PIXI.Application(PIXI_WIDTH, PIXI_HEIGHT, {backgroundColor : 0x000000});
    this.Stage = this.app.stage;
    this.mainContainer = new PIXI.Container();//Entityが乗る
    this.UIContainer = new PIXI.Container();//UIが乗る
    this.app.stage.addChild(this.mainContainer);
    this.app.stage.addChild(this.UIContainer);
    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH,PIXI_HEIGHT);

    /*拡大率*/
    this.magnification = 2;
    this.mainContainer.scale.x *= this.magnification;
    this.mainContainer.scale.y *= this.magnification;
    this.UIContainer.scale.x *= this.magnification;
    this.UIContainer.scale.y *= this.magnification;
    $("#pixiview").append(this.Renderer.view);
  }

  /*コンテナにスプライトを追加*/
  static addContainer(Sprite,CONTAINER){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.addChild(Sprite);
        break;
      default :
        this.mainContainer.addChild(Sprite);
        break;
    }
  }

  /*コンテナからスプライトを削除*/
  static removeContainer(Sprite,CONTAINER){
    switch (CONTAINER){
      case "UI" :
        this.UIContainer.removeChild(Sprite);
        break;
      default : 
        this.mainContainer.removeChild(Sprite);
        break;
    }
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOnPlayer(player){
    let centerX = - player.pos.x*this.magnification + 400;
    let centerY = - player.pos.y*this.magnification + 400;
    this.mainContainer.x = this.mainContainer.x +( centerX - this.mainContainer.x )/8;
    this.mainContainer.y = this.mainContainer.y +( centerY - this.mainContainer.y )/8;
  }

}
