import StageEntity from './Stage/stageEntity.js';
import collision from './Collision/collision.js';
import mapData from './Stage/mapData.js';
import Drawer from './drawer.js';
import Art from './art.js';
import EventManager from './Event/eventmanager.js';
import Scene from './Event/scene.js';
import Timer from './Timer.js';

import Player from './Entity/player.js';
import Input from './input.js';


export default class Game{
  static Init(){
    Drawer.Init();
    Scene.Init();
    EventManager.Init();
    StageEntity.Init();
    Timer.Init();
    Game.Load();

    /*TODO どっかに移す*/
    mapData.CreateStage(0);
  }

  static Load(){
    Art.LoadTexture();
  }

  static Update(){
    /*各Entityの位置の更新*/
    StageEntity.UpdateEntity();

    /*イベントの実行*/
    while(EventManager.eventList.length > 0){
      EventManager.eventList.pop().Do();
    }

    Timer.IncTime();
  }

  static Run(){
    requestAnimationFrame(Game.Run);

    switch(Scene.state){
      /*更新*/
      case STATE.STAGE : Game.Update();
        break;
      case 1: console.log("now state1");
        break;
    }
    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
  }
}

