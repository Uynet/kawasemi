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
import WeaponManager from './Weapon/weaponManager.js';

import Input from './input.js';

let dark;

export default class Game{
  static Init(){
    Drawer.Init();
    Scene.Init();
    EventManager.Init();
    EntityManager.Init();
    Timer.Init();
    Util.Init();
    WeaponManager.Init();


    
    /*TODO どっかに移す*/
    MapData.CreateStage(0);
    /*for debug */
    UIManager.Init();
    Game.pause = false;
    Game.select = false;


    /*TODO EffectManagerを作成*/
    dark = Art.SpriteFactory(Art.darkTexture);

    Game.Run();
  }

  static async Load(){
    await Art.LoadTexture();
    Game.Init();
  }

  static Input(){
    if(Input.isKeyClick(KEY.SP)){
    }
    /*ポーズ */
    if(Input.isKeyClick(KEY.C)){
      Game.pause = !Game.pause;
      Game.select = !Game.select;
      /*武器選択画面*/
      if(Game.select){
        /*ゲーム画面を暗くする*/
        UIManager.OpenWeapon();
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
      case STATE.STAGE :
        Game.Update();
        break;
      default :
        console.warn("unknown state");
    }
    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
  }
}

