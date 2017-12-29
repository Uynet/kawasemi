let Entity = [];


Main = _=>{
  Drawer.InitializeValuables();
  Art.Load();
  Drawer.addStage(Art.Player);
  Drawer.animate();
}

class Art{
  constructor(){
    this.Player;
    this.teki1;
    this.teki2;
  }

  static Load(){
    this.Player = new PIXI.Sprite(PIXI.Texture.fromImage('img/hiyoko2.png'));
    this.teki1 = new PIXI.Sprite(PIXI.Texture.fromImage('img/kame2.png'));
    this.teki2 = new PIXI.Sprite(PIXI.Texture.fromImage('img/zou2.png'));
  }

}

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
