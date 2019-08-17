import Event from "../event.js";
import Audio from "../../audio.js";
import Component from "../../UI/component.js";
//コンポーネントが開くように出現

/* props
 * easefunc
 * delay
 * sustain
 */
export default class PopInEvent extends Event {
  constructor(component, props) {
    super(1);
    let frame = 0;
    let delay = 0;
    let ease = props.ease;
    if (!ease) ease = x => x;
    function* popin() {
      const pos = copy(component.pos);
      let view = component;
      if (component.view) view = component.view;
      view.sprite.scale.y = 0;
      view.sprite.scale.x = 0;
      while (delay < props.delay) {
        delay++;
        yield;
      }
      Audio.PlaySE("coin1", -1.3);
      let sus = props.sus;
      if (!sus) sus = 20; //default
      while (frame <= sus) {
        const s = ease(frame / sus);
        view.sprite.scale.y = s;
        view.sprite.scale.x = s;
        view.pos.x = pos.x + (view.size.x / 2) * (1 - s);
        view.pos.y = pos.y + (view.size.y / 2) * (1 - s);
        view.SetPos(view.pos);
        frame++;
        yield;
      }
      view.pos = copy(pos);
    }
    this.func = popin();
  }
}
