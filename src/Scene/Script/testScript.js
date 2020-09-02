import Script from "./script.js";
import Input from "../../input.js";
import Game from "../../game.js";
import ScriptEvent from "./scriptEvent.js";
import EntityManager from "../../Stage/entityManager.js";
import Event from "../../Event/event.js";
import EventManager from "../../Event/eventmanager.js";
import UIManager from "../../UI/uiManager.js";
import Text from "../../UI/text.js";
import MapData from "../../Stage/mapData.js";
import Art from "../../art.js";
import UI from "../../UI/ui.js";
import MessageContent from "./messageContent.js";

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
          new MessageContent("???" , "こんにちは"),
          e2,
          new MessageContent("???" , "今日もいい天気ンゴねえ"),
          e3,
          new MessageContent("???" , "それでは"),
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
      o.forEach(e=> UIManager.remove(e));
    }

    RenderText() {
      this.CloseText()
      const player = EntityManager.player;

      const messageContent = this.content[this.scriptPointer];
      const mes = messageContent.content;
      //let sent = mes.split("\n");

      const POSITION_TEXT = vec2(16,164);
      const POSITION_FRAME= vec2(12,156);

      const t = new Text(POSITION_TEXT, mes);
      const frame= new UI(vec0());
      frame.sprite = Art.CreateSprite(Art.UIPattern.message.frame);
      frame.sprite.scale.x = 2.5;
      frame.sprite.scale.y = 1.6;
      frame.sprite.position = copy(POSITION_FRAME)
      frame.type = "scriptText";
      t.type= "scriptText";

      UIManager.add(frame);
      UIManager.add(t);
      this.state = STATE.READING;
    }

    Consume(){
        if(this.scriptPointer >= this.content.length) {
            this.Close();
            return;
        }
        const event = this.content[this.scriptPointer];

        if(event.type=="MessageContent")this.RenderText();

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