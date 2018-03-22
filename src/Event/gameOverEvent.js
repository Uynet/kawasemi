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

      while(frame<30){
        frame++;
        yield;
      }
      Audio.PlaySE("stageChange");
      Game.scene.PushSubState("SEQ");
      yield;
    }
    let itt = gen();
    this.func = itt;
  }

}
