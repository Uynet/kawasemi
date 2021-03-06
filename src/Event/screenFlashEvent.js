import Drawer from "../drawer.js";
import Event from "./event.js";

export default class ScreenFlashEvent extends Event {
  constructor(pos) {
    super(1);
    function* gen() {
      //this may be flash
      let timer = 0;

      while (timer < 4) {
        Drawer.entityContainer.filters = [Drawer.fireFilter];
        const filter = Drawer.entityContainer.filters[0];
        filter.uniforms.paintCol = timer % 2;
        let p = Drawer.ScreenPos(pos);
        filter.uniforms.x = 0.5;
        filter.uniforms.y = 0.5;
        timer++;
        yield;
      }
      Drawer.entityContainer.filters = [];
      yield;
    }
    let itt = gen();
    this.func = itt;
  }
}
