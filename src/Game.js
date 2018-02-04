import EntityManager from './Stage/entityManager.js';
import MapData from './Stage/mapData.js';
import Drawer from './drawer.js';
import Art from './art.js';
import EventManager from './Event/eventmanager.js';
import StageInEvent from './Event/stageInEvent.js';
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
    EventManager.Init();
    EntityManager.Init();
    Timer.Init();
    Util.Init();
    WeaponManager.Init();

    /*for debug */
    UIManager.Init();
    Game.pause = false;
    Game.select = false;//
      Game.seq = false;//ステージ間遷移
    Game.stage = 0;//現在のステージ番号
      Game.scene = new Scene();

    /*TODO どっかに移す*/
    MapData.CreateStage(Game.stage);
    /*TODO EffectManagerを作成*/
    dark = Art.SpriteFactory(Art.darkTexture);

    Game.Run();
  }

  static async Load(){
    await Art.LoadTexture();
    Game.Init();
  }

  static Input(){
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
  static UpdateTitle(){
  }

  static UpdateStage(){
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
  }

  static Run(){
    requestAnimationFrame(Game.Run);
    /*イベントの実行*/
    /*TODO yield*/
    /*
    while(EventManager.eventList.length > 0){
      EventManager.eventList.pop().Do();
    }
     */

     for (let l of EventManager.eventList){
       let ya = l.Do().done;
       if(ya){
         let i = EventManager.eventList.indexOf(l);
         EventManager.eventList.splice(i,1);
       }
     }
    switch(Game.scene.state){
      /*更新*/
      case STATE.TITLE :
        Game.UpdateTitle();
        if(Input.isKeyClick(KEY.SP)){
          let stageInEvent = new StageInEvent();
          EventManager.PushEvent(stageInEvent);
        }
        break;
      case STATE.STAGE :
        switch(Game.seq){
          case false: 
            //プレイ画面中
            Game.UpdateStage();
            break;
          case true :
            //遷移画面でやるべきことは
            //一定時間待ってゲーム画面に復帰すること
            //遷移画面を呼び出すのは、死んだ場合とゴールした場合o
            //ゴールしたらステージクリアイベントをプッシュ
            //ステージクリアイベントで時間を止め,
            //stage++,遷移エフェクト呼び出し
            //画面がくらい間に後ろでステージinイベントをプッシュ
            //遷移画面中
            MapData.RebuildStage();
            Game.seq = false;
            break;
      }
        break;
      default :
        console.warn("unknown state");
  }
  /*描画*/
  Drawer.Renderer.render(Drawer.Stage);
  Timer.IncTime();
}
}

