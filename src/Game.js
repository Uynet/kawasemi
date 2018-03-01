import EntityManager from './Stage/entityManager.js';
import Pool from './Stage/pool.js';
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
import Audio from './audio.js';

export default class Game{
  static Init(){
    /*audioとartはinitしない*/
    Param.Init();
    Drawer.Init();
    EventManager.Init();
    EntityManager.Init();
    Pool.Init();
    Timer.Init();
    Util.Init();
    UIManager.Init();
    WeaponManager.Init();

    /*initialize Game state*/
    Game.stage = 0;//現在のステージ番号
    Game.scene = new Scene();

    //Gameにタイトル画面状態をプッシュ
    let event = new StartGameEvent();
    EventManager.PushEvent(event);

    Game.Run();
  }

  static async Load(){
    await Art.LoadTexture();
    await Audio.Load();
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
     if(Input.isKeyClick(KEY.C) && EntityManager.player.isAlive){
       UIManager.SetMenu();
       Game.scene.PushSubState("PAUSE");
     }
  }
  static UpdatePause(){
    UIManager.Update();
  }
  //看板を読んでいるときにアニメーションだけを行う
  static UpdateMes(){
    EntityManager.Animation();
    UIManager.Update();
  }

  static UpdateSeq(){
  }

  static Run(){
    requestAnimationFrame(Game.Run);
    for (let l of EventManager.eventList){
      if(l.Do().done){
        let i = EventManager.eventList.indexOf(l);
        EventManager.eventList.splice(i,1);
      }
    }
    switch(Game.scene.state){
      /*更新*/
      /*Note : Lastは自前関数*/
      case STATE.TITLE :
        switch(Game.scene.substate.Last()){
          case "DEFAULT" : Game.UpdateTitle();break;
          case  "TRANS" : /*Nothing to do*/ break;
        }
        break;
      case STATE.STAGE :
        switch(Game.scene.substate.Last()){
          case "DEFAULT" : Game.UpdateStage();break;
          case  "PAUSE" : Game.UpdatePause();break;
          case  "MES" : Game.UpdateMes(); break;
          case  "TRANS" : /*Nothing to do*/ break;
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

