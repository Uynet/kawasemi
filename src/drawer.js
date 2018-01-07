/* Singleton */
export default class Drawer{
  constructor(){
    this.Stage;
    this.Rnderer;
  }

  //setting stage
  static InitializeValuables(){
    this.Stage = new PIXI.Stage(0x000000);
    this.Renderer = new PIXI.autoDetectRenderer(600,400);
    $("#pixiview").append(this.Renderer.view);
  }

  static addStage(Sprite){
    this.Stage.addChild(Sprite);
  }

  static popStage(Sprite){
    this.Stage.destroy(Sprite);
  }

}
