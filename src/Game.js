import EntityManager from './Stage/entityManager.js';
import collision from './Collision/collision.js';
import mapData from './Stage/mapData.js';
import Drawer from './drawer.js';
import Art from './art.js';
import EventManager from './Event/eventmanager.js';
import Scene from './Event/scene.js';
import Timer from './Timer.js';
import UIManager from './uiManager.js';

import Player from './Entity/player.js';
import Input from './input.js';


export default class Game{
  static Init(){
    Drawer.Init();
    Scene.Init();
    EventManager.Init();
    EntityManager.Init();
    Timer.Init();
    Game.Load();

    Game.pause = false;
    Game.select = false;
    /*TODO どっかに移す*/
    mapData.CreateStage(0);

  }

  static Load(){
    Art.LoadTexture();
  }

  static Input(){
    /*ポーズ */
    if(Input.isKeyInput(KEY.C)){
      Game.pause = true;
      Game.select = true;
    }else{
      Game.pause = false;
      Game.select = false;
    }
  }

  static Update(){

    Game.Input();
    /*
     * 各Entityの位置の更新
     * ポーズ中は停止させる*/
     if(!Game.pause){
       EntityManager.Update();
     }

     /*武器選択画面*/
     if(Game.select){
       UIManager.Pop();
     }

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
      default :
        console.error("unknown state");
    }
    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
  }
}

