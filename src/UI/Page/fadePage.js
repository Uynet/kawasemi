import Font from "../font.js";
import UI from "../ui.js";
import Event from "../../Event/event.js";
import UIManager from "../uiManager.js";

//このサイズは何???
const screenHeight = 160;
const screenWidth = 280;

class SlideOutUp extends Event {
  constructor(ui, onFadeOutStart, onFadeOutEnd) {
    super(1);

    let frame = 0;
    const ease = x => Math.pow(x, 7);
    const sustain = 50;

    const origPos = copy(ui.sprite.position);

    function* gen() {
      onFadeOutStart();
      while (frame <= sustain) {
        ui.sprite.position.y =
          origPos.y + screenHeight - screenHeight * ease(1 - frame / sustain);
        frame++;
        yield;
      }
      onFadeOutEnd();
      yield;
    }
    this.func = gen();
  }
}

class SlideInDown extends Event {
  constructor(ui, onFadeInEnd, onFadeOutStart, onFadeOutEnd) {
    super(1);
    let frame = 0;
    const ease = bounce;
    const sustain = 50;

    const origPos = copy(ui.sprite.position);

    function* gen() {
      while (frame <= sustain) {
        ui.sprite.position.y =
          origPos.y - screenWidth * ease(1 - frame / sustain);
        frame++;
        yield;
      }
      ui.sprite.position.y = origPos.y;
      if (onFadeInEnd) {
        //promise
        const promise = onFadeInEnd();
        if (promise)
          promise.then(() => {
            ui.Animate(new SlideOutUp(ui, onFadeOutStart, onFadeOutEnd));
          });
        else ui.Animate(new SlideOutUp(ui, onFadeOutStart, onFadeOutEnd));
      }
      yield;
    }
    this.func = gen();
  }
}
// リソースの読み込み時のフェード
export default class FadePage extends UI {
  constructor(onFadeInEnd, onFadeOutEnd, onFadeOutStart) {
    super(vec2(0));
    this.type = "fadepage";
    this.layer = "FILTER";
    //背景色
    let BG = new UI(vec2(0, 0));
    let rectBG = new PIXI.Graphics();
    rectBG.beginFill(0x201040);
    rectBG.drawRect(0, 0, screenWidth, screenHeight);
    rectBG.endFill();
    BG.sprite = rectBG;
    BG.sprite.position = copy(BG.pos);
    BG.Animate(
      new SlideInDown(BG, onFadeInEnd, onFadeOutStart, () => {
        onFadeOutEnd;
        UIManager.remove(this);
      })
    );
    BG.sprite.position.y = -640;
    //メッセージ
    this.addChild(BG);
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
