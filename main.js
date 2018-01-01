
Main = _=>{
  Game.Init();
  input = new Input();
  stage = new Stage();

  stage.addEntity(new Entity(10,10,new PIXI.Sprite(PIXI.Texture.fromImage('img/hiyoko2.png'))));


  loop();
}

class Game{
  static Init(){
    Drawer.InitializeValuables();
    this.Load();
  }

  static Load(){
    Art.Load();
  }

  static Update(){
    console.log("update");  
  }
}
