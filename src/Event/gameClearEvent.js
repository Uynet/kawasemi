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

export default class GameClearEvent extends Event{
  constructor(){
    super();
    function* gen(){
      Game.scene.PushSubState("SEQ");
      Game.stage++;
      EventManager.eventList.push(new FadeEvent("fadeout"));
      yield;
    }
    let itt = gen();
    this.func = itt;
  }

}
