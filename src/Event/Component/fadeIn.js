MapData.DeleteStage();
MapData.CreateStage(Game.stage);
import Event from "../event.js";

/* props
 * easefunc
 * delay
 * sustain
 */
export default class FadeInEvent extends Event {
  constructor(component, props) {
    super(1);
    let frame = 0;
    let delay = 0;
    let sus = props.sus;
    let ease = props.ease;
    if (!ease) ease = x => x;
    function* generator() {
      let view = component;
      view.sprite.alpha = 0;
      if (component.view) view = component.view;
      while (delay++ < props.delay) yield;
      while (frame++ <= sus) {
        view.sprite.alpha = ease(frame / sus);
        view.SetPos(view.pos);
        yield;
      }
      view.sprite.alpha = 1;
    }
    this.func = generator();
  }
}
