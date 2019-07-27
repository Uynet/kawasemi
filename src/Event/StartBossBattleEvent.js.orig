import Event from './event.js';
import Timer from "../timer.js";
import StagePop from "../UI/stagePop.js";
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

export default class StartBossBattleEvent extends Event{
  constructor(BGMTitle){
    if(!BGMTitle)console.warn("タイトルを入れて");
    super();
    function* gen(){
    let p = {
      x : 96,
      y : 64
    }
      //Drawer.Stage.filters.push(Drawer.testFilter);
      UIManager.SetBoss();
      let timer = 0;
      let po = 300;
      if(Audio.PlayingBGM.source!==null) Audio.PlayBGM(BGMTitle,2.3);
      UIManager.addUI(new StagePop(p,"^   - どうくつ   ぼす -$" , 7));
      while(timer<po){
        Drawer.SetMagnification(3 - Math.pow(timer/po,3));
        Timer.SetTimeScale(timer/po,2);
        timer++;
        yield;
      }
      Timer.SetTimeScale(1);
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
