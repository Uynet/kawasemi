import EntityManager from './Stage/entityManager.js';
import MapData from './Stage/mapData.js';
import EventManager from './Event/eventmanager.js';
import StartStageEvent from './Event/startStageEvent.js';
import StartGameEvent from './Event/startGameEvent.js';
import Scene from './Event/scene.js';
import UIManager from './UI/uiManager.js';
import WeaponManager from './Weapon/weaponManager.js';
import Art from './art.js';
import Drawer from './drawer.js';
import Input from './input.js';
import Timer from './timer.js';
import Util from './util.js';
import Param from './param.js';

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
    Game.isPause = false;
    Game.isSelect = false;//
    Game.isSeq = false;//ステージ間遷移しているかどうか
    Game.isMes = false;//メッセージイベント中か
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

  static Input(){
    //ポーズ
    if(Input.isKeyClick(KEY.C)){
      Game.isPause = !Game.isPause;
      Game.isSelect = !Game.isSelect;
      //武器選択画面
      if(Game.isSelect){
        //ゲーム画面を暗くする
        //TODO : イベント化　 
        UIManager.OpenWeapon();
        Drawer.addContainer(dark,"FILTER");
      }else{
        UIManager.CloseWeapon();
        Drawer.removeContainer(dark,"FILTER");
      }
    }
  }
  //タイトル画面中の処理
  static UpdateTitle(){
    if(Input.isKeyClick(KEY.SP)){
      let event = new StartStageEvent();
      EventManager.PushEvent(event);
    }
  }

  static UpdateStage(){
    Game.Input();
    /*
     * 各Entityの更新
     * ポーズ中は停止させる*/
     if(!Game.isPause){
       EntityManager.Update();
       UIManager.Update();
     }
     if(Game.isSelect){
       UIManager.Update();
     }
  }
  static AnimationStage(){
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
        Game.UpdateTitle();
        break;
      case STATE.STAGE :
        if(Game.isSeq){
        //遷移画面中
        }
        else if(Game.isMes){
          //メッセージ画面中
            Game.AnimationStage();
        }else{
        //プレイ画面中
            Game.UpdateStage();
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

