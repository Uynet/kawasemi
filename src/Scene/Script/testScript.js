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
          new MessageContent("???" , "こんにちは","elice"),
          e2,
          new MessageContent("エリス", "今日もいい天気ンゴねえ","elice"),
          new MessageContent("エリス", "五月雨を集めているとき、こちらもまた\n五月雨に集められているのだ","elice"),
          e3,
          new MessageContent("エリス", "それでは","elice"),
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
      const content = messageContent.content;
      const name = messageContent.name;
      const img = messageContent.img;

      const POSITION_TEXT = vec2(56,174);
      const POSITION_NAME= vec2(56,166);
      const POSITION_IMG= vec2(20,166);
      const POSITION_FRAME= vec2(12,156);

      const contentUI = new Text(POSITION_TEXT, content);

      const nameUIStyle ={ fontFamily: 'gkktt', fontSize: 40, fill: 0x5080cf}
      const nameUI = new Text(POSITION_NAME, name , nameUIStyle);

      const frameUI = new UI(vec0());
      frameUI.sprite = Art.CreateSprite(Art.UIPattern.message.frame);
      frameUI.sprite.scale.x = 2.5;
      frameUI.sprite.scale.y = 1.6;
      frameUI.sprite.position = copy(POSITION_FRAME)

      const imgUI = new UI(vec0());
      imgUI.sprite = Art.CreateSprite(Art.elice);
      imgUI.sprite.scale.set(1.5)
      imgUI.sprite.position = copy(POSITION_IMG)

      frameUI.type = "scriptText";
      nameUI.type= "scriptText";
      imgUI.type = "scriptText";
      contentUI.type= "scriptText";

      UIManager.add(frameUI);
      UIManager.add(nameUI);
      UIManager.add(contentUI);
      UIManager.add(imgUI);
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