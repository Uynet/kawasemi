/*+∵.EntryPoint.∴+*/
Main = _=>{
  Game.Init();

  for(let mapY = 0;mapY<10;mapY++){
    for(let mapX = 0;mapX<5;mapX++){
      switch(map[mapY][mapX]){
        case 0 :
          /*nothing to do*/
          break;
        case 1 :
          stageEntity.addEntity(new Wall({x:32*mapX,y:32*mapY}));
          break;
 case 2 :
   stageEntity.addEntity(new Player({x:32*mapX,y:32*mapY}));
   break;
      }
    }
  }
  loop();
}

class Game{
  static Init(){
    /* class */
    input = new Input();
    util = new Util();
    stageEntity = new StageEntity();
    collision = new Collision();
    mapData = new MapData();
    /* ------*/

    /*TODO Sceneクラスでやる*/
    state = 0;

    Drawer.InitializeValuables();
    this.Load();
  }

  static Load(){
    Art.LoadTexture();
    mapData.Load();
  }

  static Update(){
    //各Entityの位置の更新
    for(let l of stageEntity.EntityList){
      l.updatePosition(); 
    }
  }
}
