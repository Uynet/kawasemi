import Event from "../event.js";

/* props
 * easefunc
 * delay
 * sustain
 */
export default class SlideInEvent extends Event {
  constructor(component, props) {
    super(1);
    let frame = 0;
    let delay = 0;
    let sus = props.sus;
    let ease = props.ease;
    let amp = props.amp;
    if (!ease) ease = x => x;
    function* popin() {
      const pos = copy(component.pos);
      let view = component;
      view.pos.y = pos.y + amp;
      view.SetPos(view.pos);
      if (component.view) view = component.view;
      while (delay++ < props.delay) yield;
      while (frame++ <= sus) {
        view.pos.y = pos.y + amp * ease(frame / sus);
        view.pos.y = Math.floor(view.pos.y);
        view.SetPos(view.pos);
        yield;
      }
      view.pos = copy(pos);
    }
    this.func = popin();
  }
}
