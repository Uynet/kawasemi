import Event from "../event.js";
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
    component.sprite.scale.y = 0;
    component.sprite.scale.x = 0;
    let ease = props.ease;
    if (!ease) ease = x => x;
    const pos = copy(component.pos);
    function* popin() {
      while (delay < props.delay) {
        delay++;
        yield;
      }
      let sus = props.sus;
      if (!sus) sus = 20; //default
      while (frame <= sus) {
        const s = ease(frame / sus);
        component.sprite.scale.y = s;
        component.sprite.scale.x = s;
        component.pos.x = pos.x + (component.size.x / 2) * (1 - s);
        component.pos.y = pos.y + (component.size.y / 2) * (1 - s);
        component.SetPos(component.pos);
        component.sprite.position.y++;
        frame++;
        yield;
      }
    }
    component.pos = copy(pos);
    this.func = popin();
  }
}
