/*形状*/
const SHAPE = {
  BOX : 0,
  CIRCLE : 1
};

/*Entity*/
const ENTITY_TYPE = {
 PLAYER  : 0,
 WALL : 1
};

/*Key*/
const KEY = {
  UP : 38,
  DOWN : 40,
  RIGHT : 39,
  LEFT : 37,
  Z : 90
}

/*singleton*/
let stageEntity;
let input;
let state;
let util;
let collision;

//ato de kesu
const map = [
  [1,1,1,1,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [1,0,2,0,1],
  [1,1,1,1,1]
];

Main = _=>{
  Game.Init();
  input = new Input();
  util = new Util();
  stageEntity = new StageEntity();
  collision = new Collision();
  state = 0;

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
