import Event from './event.js';
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

//指定したBGMを開始する
export default class BGMStartEvent extends Event{
  constructor(BGMTitle){
    if(!BGMTitle)console.warn("タイトルを入れて");
    super();
    function* gen(){
    let p = {
      x : 96+96,
      y : 64
    }
      Audio.PlayBGM(BGMTitle,0.9);
      //Drawer.Stage.filters.push(Drawer.testFilter);
      UIManager.addUI(new StagePop(p,"^   - どうくつ   ぼす -$" , 7));
      UIManager.SetBoss();
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
