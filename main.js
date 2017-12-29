Main = _=>{
  Game.Init();
  Drawer.addStage(Art.Player);
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
