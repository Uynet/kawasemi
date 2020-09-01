import Script from "./script.js";
import Input from "../../input.js";
import Game from "../../game.js";
import ScriptEvent from "./scriptEvent.js";
import EntityManager from "../../Stage/entityManager.js";
import Event from "../../Event/event.js";
import EventManager from "../../Event/eventmanager.js";
import Param from "../../param.js";

class TestEvent extends Event {
  constructor() {
    super(1);
    let frame = 0;
    const sustain = 50;

    const player = EntityManager.player;
    function* gen() {
      while (frame <= sustain) {
        player.state = "RUNNING";
        player.dir = "R";
        player.isRun = true;
        player.toArg = 0;
        player.acc.x = Param.player.runVel;
        player.vel.x = Math.max(0, player.vel.x);
        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}

export default class TestScript extends Script{
    constructor(){
        super()
        this.scriptPointer = 0;
        const e1 = new ScriptEvent("1");
        const e2 = new ScriptEvent("2");
        const e3 = new ScriptEvent("3");
        e1.execute = function(script){ 
            console.log(this.label);
            const e = new TestEvent();
            EventManager.Add(e);
        }.bind(e1);
        this.content = [ e1,e2,e3 ];
        this.eventList = [];
    }
    Init(){
      console.log("init");
    };
    Close(){
        Game.state.transit("main");
    }
    Consume(){
        if(this.scriptPointer >= this.content.length) {
            this.Close();
            return;
        }
        const event = this.content[this.scriptPointer];
        event.execute(this);
        this.scriptPointer++;
    }
    Update(){
        if(Input.isKeyClick(KEY.X)) this.Consume() ;
    }
}