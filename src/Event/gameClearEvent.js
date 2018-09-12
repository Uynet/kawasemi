import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import MapData from '../Stage/mapData.js';
import Game from '../game.js';
import Drawer from '../drawer.js';
import Art from '../art.js';
import Audio from '../audio.js'
import EventManager from './eventmanager.js';
import FadeEvent from './fadeEvent.js';
import Param from "../param.js";

export default class GameClearEvent extends Event{
  constructor(){
    super();
    function* gen(){
      //ステータス退避
      Param.player.status = {
        hp : EntityManager.player.hp,
        bullet : EntityManager.player.bullet,
      }

      let frame = 0;
      Game.scene.PushSubState("TRANS");
      Game.stage++;
      Audio.PlaySE("stageChange");
      UIManager.PopStage(Game.stage);
      EventManager.eventList.push(new FadeEvent("fadeout"));
      while(frame < 50){
        frame++;
        yield;
      }

      if(Audio.PlayingBGM.name!="stage5" && Game.stage != 12)Audio.PlayBGM("stage5",0.0);
      if(Game.stage == 11){
        Audio.StopBGM();//todo : フェードアウト 
        Game.continuePoint = 11;
      }
      if(Audio.PlayingBGM.name!="boss" && Game.stage == 12)Audio.PlayBGM("boss",0.5);

      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
