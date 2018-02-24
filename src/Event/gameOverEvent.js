import Event from './event.js';
import UIManager from '../UI/uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import MapData from '../Stage/mapData.js';
import Game from '../Game.js';
import Timer from '../timer.js';
import Drawer from '../drawer.js';
import Art from '../art.js';
import EventManager from './eventmanager.js';
import FadeEvent from './FadeEvent.js';

export default class GameOverEvent extends Event{
  constructor(){
    super();
    function* gen(){
      let frame = 0;
      EventManager.eventList.push(new FadeEvent("fadeout"));

      while(frame<30){
        frame++;
        yield;
      }
      Game.scene.PushSubState("SEQ");
      yield;
    }
    let itt = gen();
    this.func = itt;
  }

}
