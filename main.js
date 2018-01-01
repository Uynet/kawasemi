Main = _=>{
  Game.Init();
  Stage.addEntity(new Entity(10,10,new PIXI.Sprite(PIXI.Texture.fromImage('img/hiyoko2.png'))));
  input = new Input();
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
    
  }
}
