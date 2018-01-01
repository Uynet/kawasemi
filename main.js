Main = _=>{
  Game.Init();
  for(let i = 0;i<10;i++){
    Stage.addEntity(new Entity(10*i,10*i,new PIXI.Sprite(PIXI.Texture.fromImage('img/kame2.png'))));
  }
  input = new Input();
  Drawer.animate();
}

class Game{
  static Init(){
    Drawer.InitializeValuables();
    this.Load();
  }

  static Load(){
    Art.Load();
  }
}
