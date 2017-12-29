Main = _=>{
  Game.Init();
  Stage.addEntity(new Entity(100,100,Art.Player));
  Drawer.animate();
}
    
class Game{
  static Init(){
    Drawer.InitializeValuables();
    this.Load();
  }

  static Load(){
    console.log("load");
    Art.Load();
  }
}
