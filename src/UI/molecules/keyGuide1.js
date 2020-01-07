import UI from "../ui.js";
import Key from "../atoms/key.js";
import Font from "../font.js";
import Event from "../../Event/event.js";

class SlideInLeft extends Event {
  constructor(ui) {
    super(1);
    let frame = 0;
    const ease = elastic;
    const sustain = 20;

    const origPos = copy(ui.sprite.position);

    function* gen() {
      while (frame <= sustain) {
        ui.sprite.position.x = origPos.x + 30 * ease(1 - frame / sustain);
        frame++;
        yield;
      }
      ui.sprite.position.x = origPos.x;
      yield;
    }
    this.func = gen();
  }
}
export default class KeyGuide1 extends UI {
  /*keyname : Z X C Right Left Up Down */
  constructor(pos) {
    super(pos);
    this.addChild(new Key(vec2(40, 90), "Z"));
    this.addChild(new Font(vec2(60, 94), "キーでジャンプします", "MES"));
    this.Animate(new SlideInLeft(this));
  }
  KeyNameToCode(keyname) {
    return KEY[keyname];
  }
  Update() {
    this.ExecuteEvent();
    this.children.forEach(u => u.Update());
  }
}
