import Text from "../../text.js";
import UI from "../../ui.js";
import Event from "../../../Event/event.js";
import Input from "../../../input.js";

const sustain = 20;
const WIDTH_BG = 61;

class Defocus extends Event{
  constructor(ui){
    super(1);
    let frame = 0;
    const ease = x => {
      return Math.pow(1-x , 8);
    };
    function* gen() {
      while (frame <= sustain) {
        const style = { fontFamily: 'gkktt', fontSize: 50, fill: 0xffffff}
        ui.textUI.setStyle(style);
        ui.BG.sprite.width = WIDTH_BG * ease(frame/sustain)
        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}
class Focus extends Event{
  constructor(ui){
    super(1);
    let frame = 0;
    const ease = x => {
      return 1-Math.pow(1-x , 8);
    };
    function* gen() {
      while (frame <= sustain) {
        const style = { fontFamily: 'gkktt', fontSize: 50, fill: 0x201040}
        ui.textUI.setStyle(style);
        ui.BG.sprite.width = WIDTH_BG * ease(frame/sustain)
        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}
// Y/N
export default class shopSelectItem extends UI{
    constructor(pos , text){
        super(pos)

        this.text = text;
        this.BG = new UI(vec0());
        const rect = new PIXI.Graphics();
        const w = WIDTH_BG;
        const h = 14;
        rect.beginFill(0xffffff)
        rect.drawRect(-4,-4, w, h);
        rect.endFill();
        rect.width = 0;
        this.BG.sprite = rect;

        this.textUI = new Text(vec0() , text);
        this.addChild(this.BG);
        this.addChild(this.textUI);
    }
    onFocus(){
        this.Animate(new Focus(this))
    }
    onDefocus(){
        this.Animate(new Defocus(this))
    }
}