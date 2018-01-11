/* なんで動いているんだ */
export default class Drawer{

  //setting stage
  static Init(){
    this.app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
    this.Stage = this.app.stage;///new PIXI.Stage(0x000000);
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.Renderer = new PIXI.autoDetectRenderer(800,600);
    $("#pixiview").append(this.Renderer.view);
  }

  static addStage(Sprite){
    this.container.addChild(Sprite);
  }

  static popStage(Sprite){
    this.Stage.destroy(Sprite);
  }

  /* プレイヤー中心にスクロール*/
  static ScrollOnPlayer(player){
    this.container.y = -player.pos.y + 300; 
    this.container.x = -player.pos.x + 300;
  }

}
