import Art from "./art.js";
import Audio from "./audio.js";
import Drawer from "./drawer.js";
import EventManager from "./Event/eventmanager.js";
import Scene from "./Event/scene.js";
import StartGameEvent from "./Event/startGameEvent.js";
import StartStageEvent from "./Event/startStageEvent.js";
import State from "./Event/State.js";
import Input from "./input.js";
import Param from "./param.js";
import DistanceField from "./Stage/distanceField.js";
import EntityManager from "./Stage/entityManager.js";
import Pool from "./Stage/pool.js";
import StageData from "./Stage/stageData.js";
import Timer from "./timer.js";
import UIManager from "./UI/uiManager.js";
import WeaponManager from "./Weapon/weaponManager.js";

import { debugOption } from "./debug.js";

export default class Game {
  static Init() {
    /*audioとartはinitしない*/
    Param.Init();
    Drawer.Init();
    EventManager.Init();
    WeaponManager.Init();
    EntityManager.Init();
    Pool.Init();
    Timer.Init();
    UIManager.Init();
    StageData.Init();
    DistanceField.Init();

    /*initialize Game state*/
    //現在のステージ番号
    if (isDebugMode) Game.stage = debugOption.entryStage;
    else Game.stage = 1;
    Game.continuePoint = 1; //コンティニュー地点

    Game.scene = new Scene();
    Game.state = new State();

    //Gameにタイトル画面状態をプッシュ
    let event = new StartGameEvent();
    EventManager.PushEvent(event);

    Game.Run();
  }

  static async Load() {
    await Art.LoadTexture();
    Audio.Load();

    Game.Init();

    Input.returnScroll(); //スクロール解除
  }
  //ローディング画面中の処理
  static UpdateLoading() {
    UIManager.Update();
  }

  //タイトル画面中の処理
  static UpdateTitle() {
    if (Input.isAnyKeyClick()) {
      let event = new StartStageEvent();
      EventManager.PushEvent(event);
    }
    EntityManager.UpdateTitle();
  }

  //ステージ中の処理
  static UpdateStage() {
    /*Entityの更新*/
    EntityManager.Update();
    UIManager.Update();

    /*ポーズ状態に遷移*/
    if (isDebugMode && Input.isKeyClick(KEY.ESC)) {
      UIManager.SetMenu();
      Game.scene.PushSubState("PAUSE");
    }
  }
  static UpdatePause() {
    UIManager.Update();
  }
  //看板を読んでいるときにアニメーションだけを行う
  static UpdateMes() {
    EntityManager.Animation();
    UIManager.Update();
  }

  static Run() {
    for (let event of EventManager.eventList) {
      if (event.Do().done) {
        EventManager.Remove(event);
      }
    }
    switch (Game.scene.state) {
      /*更新*/
      /*Note : Lastは自前関数*/
      case STATE.LOADING:
        Game.UpdateLoading();
        break;
      case STATE.TITLE:
        switch (Game.scene.substate.Last()) {
          case "DEFAULT":
            Game.UpdateTitle();
            break;
          case "TRANS":
            /*Nothing to do*/ break;
        }
        break;
      case STATE.STAGE:
        switch (Game.scene.substate.Last()) {
          case "DEFAULT":
            Game.UpdateStage();
            break;
          case "PAUSE":
            Game.UpdatePause();
            break;
          case "MES":
            Game.UpdateMes();
            break;
          case "TRANS":
            /*Nothing to do*/ break;
        }
        break;
      default:
        console.warn("unknown state:", Game.scene.state);
        return;
    }
    /*描画*/
    Drawer.Renderer.render(Drawer.Stage);
    Audio.Update();
    Timer.IncTime();
    requestAnimationFrame(Game.Run);
  }
}
