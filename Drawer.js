/* Singleton */
class Drawer{
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

  /*animation loop
   *なんでここthisだとダメなの..
   */
  static animate(){
    requestAnimationFrame(Drawer.animate);

    //input test
    //console.log(new Keyboard().key);

    Drawer.Renderer.render(Drawer.Stage);
  }
}
