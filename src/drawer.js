const PIXI_WIDTH = 800;
const PIXI_HEIGHT = 600;

export default class Drawer{

  /*setting stage*/
  static Init(){
    this.app = new PIXI.Application(PIXI_WIDTH, PIXI_HEIGHT, {backgroundColor : 0x000000});
    this.Stage = this.app.stage;
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.Renderer = new PIXI.autoDetectRenderer(PIXI_WIDTH,PIXI_HEIGHT);

    this.magnification = 2;

    /*拡大率*/
    this.container.scale.x *= this.magnification;
    this.container.scale.y *= this.magnification;
    $("#pixiview").append(this.Renderer.view);
  }

  /*コンテナにスプライトを追加*/
  static addStage(Sprite){
    this.container.addChild(Sprite);
  }

  /*未使用*/
  static popStage(Sprite){
    this.Stage.destroy(Sprite);
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOnPlayer(player){
    this.container.x = - player.pos.x*this.magnification + 400;
    this.container.y = - player.pos.y*this.magnification + 300;
  }

}
