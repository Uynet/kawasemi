import UI from "./ui.js";
import PopInEvent from "../Event/Component/popIn.js";
import Audio from "../audio.js";
import Event from "../Event/event.js";

class PopItem extends Event {
  constructor(item, props) {
    super(0);
    let frame = 0;
    function* generator() {
      item.sprite.alpha = 0;
      while (frame <= props.delay) {
        frame++;
        yield;
      }
      item.sprite.alpha = 1;
      Audio.PlaySE("coin1", -1.3);
      props.delay = 0;
      item.Animate(new PopInEvent(item, props));
      return;
    }
    this.func = generator();
  }
}

export default class ListUI extends UI {
  constructor(pos, list) {
    super(pos);
    this.list = list;
    //this.SetPos(this.pos);
  }
  SetPos(pos) {
    let offSet = 0;
    this.list.forEach(itemUI => {
      const p = copy(pos);
      let spriteSize = itemUI.GetSpriteSize();
      p.x += offSet;
      itemUI.SetPos(p);
      offSet += spriteSize.x;
      this.children.push(itemUI);
      itemUI.size = vec2(16); //HARDCORD
      const props = {
        delay: offSet / 2 + 32,
        sus: 20,
        //ease: bounceOut
        ease: easeOutElastic
      };
      itemUI.Animate(new PopItem(itemUI, props));
      itemUI.Add();
    });
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
