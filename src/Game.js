import StageEntity from './Stage/stageEntity.js';
import collision from './Collision/collision.js';
import mapData from './mapData.js';
import Drawer from './drawer.js';
import Art from './art.js';


/*TODO Sceneクラスでやる*/
let state = 0;

export default class Game{
  constructor(){
  }
  static Init(){
    Drawer.InitializeValuables();
    Game.Load();

    /*TODO どっかに移す*/
    mapData.CreateStage(0);
  }

  static Load(){
    Art.LoadTexture();
  }

  static Update(){
    //各Entityの位置の更新
    StageEntity.UpdateEntity();
  }

  static Run(){
    requestAnimationFrame(Game.Run);

    switch(state){
      /*更新*/
      case 0 : Game.Update();
        break;
    }
    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
  }
}

