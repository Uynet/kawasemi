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

export default class GameClearEvent extends Event{
  constructor(){
    super();
    function* gen(){
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
      if(Game.stage == 2)Audio.PlayBGM("stage5",0.2);
      if(Game.stage == 5)Drawer.entityContainer.filters = [Drawer.testFilter];
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
