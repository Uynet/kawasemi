import Event from "../../Event/event.js";
import Input from "../../input.js";

export default class ScriptEvent extends Event{
    constructor(script){
        super(1);
        const sustain = 50;
        let frame = 0;
        function* gen() {
            while(frame<sustain){
                frame++;
                yield;
            }
            script.state = "WAITING";
            Input.restore();
            yield;
        }
    this.func = gen();
  }
}