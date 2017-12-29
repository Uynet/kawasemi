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
    document.getElementById("pixiview").appendChild(this.Renderer.view);
  }

  static addStage(Sprite){
    this.Stage.addChild(new PIXI.Sprite(PIXI.Texture.fromImage('img/hiyoko2.png')));
  }

  //animation loop
  //なんでここthisだとダメなの..
  static animate(){
    requestAnimationFrame(Drawer.animate);

    Drawer.Renderer.render(Drawer.Stage);
  }
}
