import Script from "./script.js";
import Input from "../../input.js";
import Game from "../../game.js";
import ScriptEvent from "./scriptEvent.js";
import EntityManager from "../../Stage/entityManager.js";
import Event from "../../Event/event.js";
import EventManager from "../../Event/eventmanager.js";
import Param from "../../param.js";
import UIManager from "../../UI/uiManager.js";
import Text from "../../UI/text.js";
import MapData from "../../Stage/mapData.js";
import Timer from "../../timer.js";

const STATE = {
  EVENT:"EVENT",
  READING:"READING",
  WAITING:"WAITING"
}

class TestEvent extends Event {
  constructor(script) {
    super(1);
    let frame = 0;
    const sustain = 30;
    console.log("1");

    const player = EntityManager.player;
    function* gen() {
      while (frame <= sustain) {
        player.isWalkRight = true;
        frame++;
        yield;
      }
     player.isWalkRight = false;
      script.state = STATE.WAITING;
      Input.restore();
    }
    this.func = gen();
  }
}


export default class TestScript extends Script{
    constructor(){
        super()
        this.scriptPointer = 0;
        this.state = STATE.EVENT; 
        const e1 = new TestEvent(this);
        const e2 = new ScriptEvent(this);
        const e3 = new ScriptEvent(this);

        this.content = [ 
          e1,
          "こんにちは",
          e2,
          "今日もいい天気ンゴねえ",
          e3,
          "それでは"
         ];
        this.eventList = [];
    }
    GoToWorldMap(){
      Game.state.transit("transition");
      const transitionState = Game.state.getState();
      transitionState.onFadeInEnd = () => {
        return new Promise(resolve => {
          UIManager.CleanBack();
          MapData.DeleteStage();
          resolve();
        });
      };
      transitionState.onFadeOutStart = () => {
        Game.state.transit("worldMap");
      }
    };

    Init(){
      this.Consume();
    };
    Close(){
        this.CloseText();
        this.GoToWorldMap();
    }

    CloseText(){
      //すでにテキストが出ていれば重複しないように消す
      const o = UIManager.find("scriptText");
      if(o.length >= 1)UIManager.remove(o[0]);
    }

    RenderText() {
      this.CloseText()
      const player = EntityManager.player;

      const mes = this.content[this.scriptPointer];
      //let sent = mes.split("\n");

      const POSITION_TEXT = {
        x: 16,
        y: 164
      };

      const t = new Text(POSITION_TEXT, mes);
      t.type= "scriptText";

      UIManager.add(t);
      this.state = STATE.READING;
    }

    Consume(){
        if(this.scriptPointer >= this.content.length) {
            this.Close();
            return;
        }
        const event = this.content[this.scriptPointer];

        if(typeof(event)=="string")this.RenderText();
        else {
          Input.lock();
          this.state = STATE.EVENT;
          this.CloseText();
          const player = EntityManager.player;
          EventManager.Add(event);
        }
        this.scriptPointer++;
    }

    Update(){
      if(this.state == STATE.WAITING) this.Consume() ;
      if(this.state == STATE.READING && Input.isKeyClick(KEY.X)) this.Consume() ;

    }
}