//
let stageEntity;
//入力
let input;
//状態
let state = 0;

let map = [
  [1,1,1,1,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,2,0,1],
  [1,1,1,1,1]
];

Main = _=>{
  Game.Init();
  input = new Input();
  stageEntity = new StageEntity();


  for(let y = 0;y<5;y++){
    for(let x = 0;x<5;x++){
      switch(map[y][x]){
        case 0 :
          stageEntity.addEntity(new Wall(32*x,32*y,Art.SpriteFactory(Art.teki1Texture)));
          break;
        case 1 :
          stageEntity.addEntity(new Wall(32*x,32*y,Art.SpriteFactory(Art.teki2Texture)));
          break;
        case 2 :
          stageEntity.addEntity(new Player(32*x,32*y,Art.SpriteFactory(Art.playerTexture)));
          break;
      }
    }
  }
  loop();
}

class Game{
  static Init(){
    Drawer.InitializeValuables();
    this.Load();
  }

  static Load(){
    Art.LoadTexture();
  }

  static Update(){
    //各Entityの位置の更新
    for(let l of stageEntity.EntityList){
      l.updatePosition(); 
    }
  }
}
