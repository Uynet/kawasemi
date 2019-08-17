import UI from "./ui.js";
import PopInEvent from "../Event/Component/popIn.js";

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
        delay: offSet / 3 + 32,
        sus: 20,
        ease: bounceOut
      };
      itemUI.Animate(new PopInEvent(itemUI, props));
      itemUI.Add();
    });
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
