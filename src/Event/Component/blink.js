import Event from "../event.js";

//点滅する
export default class BlinkEvent extends Event {
  constructor(component, props) {
    super();
    let frame = 0;
    let delay = 0;
    component.sprite.alpha = 0.0;
    function* gen() {
      while (delay < props.delay) {
        delay++;
        yield;
      }
      let sus = props.sus;
      if (!sus) sus = 20; //default
      while (frame <= sus) {
        if (frame % 6 < 3) component.sprite.alpha = 0.3;
        else component.sprite.alpha = 1.0;
        frame++;
        yield;
      }
      component.sprite.alpha = 1.0;
      yield;
    }
    this.func = gen();
  }
}
