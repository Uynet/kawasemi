import EntityManager from './Stage/entityManager.js';
import MapData from './Stage/mapData.js';
import Drawer from './drawer.js';
import Art from './art.js';
import EventManager from './Event/eventmanager.js';
import Scene from './Event/scene.js';
import Timer from './timer.js';
import UIManager from './UI/uiManager.js';
import UI from './UI/ui.js';
import UISelectBox from './UI/uiSelectBox.js';
import UIWeaponIcon from './UI/uiWeaponIcon.js';
import UIWeaponEquip from './UI/uiWeaponEquip.js';
import Util from './util.js';

import Player from './Entity/player.js';
import Input from './input.js';

let dark;

export default class Game{
  static Init(){
    Drawer.Init();
    Scene.Init();
    EventManager.Init();
    EntityManager.Init();
    Timer.Init();
    UIManager.Init();
    Util.Init();

    Game.Load();

    Game.pause = false;
    Game.select = false;

    /*for debug */
    /*TODO どっかに移す*/
    MapData.CreateStage(0);
    UIManager.addUI(new UIWeaponIcon(1));
    UIManager.addUI(new UIWeaponIcon(2));
    UIManager.addUI(new UIWeaponIcon(3));
    UIManager.addUI(new UIWeaponEquip("po"));
    dark = Art.SpriteFactory(Art.darkTexture);
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
        UIManager.addUI(new UISelectBox());
        /*ゲーム画面を暗くする*/
        Drawer.addContainer(dark,"FILTER");
      }else{
        UIManager.CloseWeapon();
        Drawer.removeContainer(dark,"FILTER");
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

