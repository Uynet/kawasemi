let stageEntity;
let input;

Main = _=>{
  Game.Init();
  input = new Input();
  stageEntity = new StageEntity();
  stageEntity.addEntity(new Player(10,10,Art.Player));

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
    stageEntity.EntityList[0].updatePosition(); 
  }
}
