import Event from './event.js';
import EventManager from './eventmanager.js';
import FadeEvent from './fadeEvent.js';
import Game from '../game.js';
import Audio from '../audio.js';

export default class GameOverEvent extends Event{
  constructor(){
    super();
    function* gen(){
      let frame = 0;
      EventManager.eventList.push(new FadeEvent("fadeout"));

      Audio.PlaySE("stageChange");
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
