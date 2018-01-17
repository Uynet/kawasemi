import EntityManager from './Stage/entityManager.js';
import MapData from './Stage/mapData.js';
import Drawer from './drawer.js';
import Art from './art.js';
import EventManager from './Event/eventmanager.js';
import Scene from './Event/scene.js';
import Timer from './timer.js';
import UIManager from './uiManager.js';
import UI from './ui.js';

import Player from './Entity/player.js';
import Input from './input.js';


export default class Game{
  static Init(){
    Drawer.Init();
    Scene.Init();
    EventManager.Init();
    EntityManager.Init();
    Timer.Init();
    UIManager.Init();

    Game.Load();

    Game.pause = false;
    Game.select = false;

    /*TODO どっかに移す*/
    MapData.CreateStage(0);
    UIManager.addUI(new UI(Art.weapon1Texture,0));
    UIManager.addUI(new UI(Art.weapon2Texture,0));
    UIManager.addUI(new UI(Art.weapon3Texture,0));
    UIManager.addUI(new UI(Art.selectboxTexture,1));
  }

  static Load(){
    Art.LoadTexture();
  }

  static Input(){
    /*ポーズ */
    if(Input.isKeyClick(KEY.C)){
      Game.pause = !Game.pause;
      Game.select = !Game.select;

      /*武器選択画面*/
      if(Game.select){
      }else{
       UIManager.CloseWeapon();
      }


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

     if(Game.select){
       UIManager.Update();
     }

     /*イベントの実行*/
     /*TODO yield*/
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

