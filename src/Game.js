import EntityManager from './Stage/entityManager.js';
import MapData from './Stage/mapData.js';
import EventManager from './Event/eventmanager.js';
import StartStageEvent from './Event/startStageEvent.js';
import StartGameEvent from './Event/startGameEvent.js';
import Scene from './Event/scene.js';
import UIManager from './UI/uiManager.js';
import Font from './UI/Font.js';
import WeaponManager from './Weapon/weaponManager.js';
import Art from './art.js';
import Drawer from './drawer.js';
import Input from './input.js';
import Timer from './timer.js';
import Util from './util.js';
import Param from './param.js';
import Menu from './UI/Menu.js';

//大嘘
let dark;

export default class Game{
  static Init(){
    Drawer.Init();
    EventManager.Init();
    EntityManager.Init();
    Timer.Init();
    Util.Init();
    WeaponManager.Init();
    UIManager.Init();
    Param.Init();

    /*initialize Game state*/
    Game.stage = 0;//現在のステージ番号
    Game.scene = new Scene();

    //Gameにタイトル画面状態をプッシュ
    let event = new StartGameEvent();
    EventManager.PushEvent(event);

    /*for debug */
    /*TODO EffectManagerを作成*/
    dark = Art.SpriteFactory(Art.darkTexture);
    dark.alpha = 0.7;

    Game.Run();
  }

  static async Load(){
    await Art.LoadTexture();
    Game.Init();
  }

  //タイトル画面中の処理
  static UpdateTitle(){
    if(Input.isKeyClick(KEY.SP)){
      let event = new StartStageEvent();
      EventManager.PushEvent(event);
    }
  }

  //ステージ中の処理
  static UpdateStage(){
    /*Entityの更新*/
     EntityManager.Update();
     UIManager.Update();

     /*ポーズ状態に遷移*/
     if(Input.isKeyClick(KEY.C)){
       let filters = [Drawer.blurFilter];
       filters = [];
       Drawer.addContainer(dark,"FILTER");
       UIManager.SetMenu();
       Game.scene.PushSubState("PAUSE");
     }
  }
  static UpdatePause(){
    UIManager.Update();
    //メニュー画面を抜ける
    if(Input.isKeyClick(KEY.C)){
      UIManager.CloseMessage();
      Drawer.removeContainer(dark,"FILTER");
      UIManager.removeUI(UIManager.menu);
      Game.scene.PopSubState();
    }
  }
  //看板を読んでいるときにアニメーションだけを行う
  static UpdateMes(){
    EntityManager.Animation();
    UIManager.Update();
  }

  static Run(){
    requestAnimationFrame(Game.Run);
    /*イベントをyieldで実行*/
    for (let l of EventManager.eventList){
      let d = l.Do().done;
      if(d){
        let i = EventManager.eventList.indexOf(l);
        EventManager.eventList.splice(i,1);
      }
    }
    switch(Game.scene.state){
      /*更新*/
      case STATE.TITLE :
        switch(Game.scene.substate[0]){
          case  "SEQ" : /*Nothing to do*/ break;
          default : Game.UpdateTitle();
        }
        break;
      case STATE.STAGE :
        switch(Game.scene.substate[0]){
          case  "PAUSE" : Game.UpdatePause();break;
          case  "MES" : Game.UpdateMes(); break;
          case  "SEQ" : /*Nothing to do*/ break;
          default : Game.UpdateStage();
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

