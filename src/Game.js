import StageEntity from './Stage/stageEntity.js';
import collision from './Collision/collision.js';
import mapData from './mapData.js';
import Drawer from './drawer.js';
import Art from './art.js';
import EventManager from './Event/eventmanager.js';
import Scene from './Event/scene.js';

import Player from './Entity/Mover/player.js';
import Input from './input.js';


/*TODO Sceneクラスでやる*/
let state = 0;

export default class Game{
  static Init(){
    Drawer.Init();
    Scene.Init();
    EventManager.Init();
    StageEntity.Init();
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

    switch(Scene.state){
      /*更新*/
      case STATE.STAGE : Game.Update();
        break;
      case 1: console.log("unko");
        break;
    }
    console.log(EventManager.eventList);
    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
  }
}

