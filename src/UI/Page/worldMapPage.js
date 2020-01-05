import Font from "../font.js";
import UI from "../ui.js";
import Art from "../../art.js";
import Event from "../../Event/event.js";

class PoyoEvent extends Event {
  constructor(ui) {
    super(1);
    let frame = 0;
    const ease = x => {
      return 1.5 + 1.5 / (x * 50 + 1);
    };
    const sustain = 50;
    function* gen() {
      while (frame <= sustain) {
        ui.sprite.anchor.set(0.5);
        ui.sprite.scale = vec2(ease(frame / sustain));
        frame++;
        yield;
      }
    }
    this.func = gen();
  }
}
class Cusor extends UI {
  constructor() {
    super(vec2(0));
    this.pointer = 0;
    this.sprite = new PIXI.Sprite();
    this.sprite.scale.set(1.5);
    this.pattern = Art.bulletPattern.target;
    this.sprite.texture = this.pattern[0];
  }
  FocusOn(entity) {
    this.pos = copy(entity.pos);
    this.pos.x += 8;
    this.pos.y += 8;
    this.SetPos(this.pos); //初回呼び出し時点ではitemにスタイルが適用
    const e = new PoyoEvent(this);
    this.Animate(e);
  }
  Update() {
    this.SetPos(this.pos);
    this.ExecuteEvent();
    this.frame++;
  }
}
class Node extends UI {
  constructor(pos, stageNum) {
    super(pos);
    this.stageNum = stageNum;

    this.sprite = Art.Sprite(Art.enemyPattern.enemy4[1]);
    this.sprite.position = pos;
  }
}
export default class WorldMapPage extends UI {
  constructor() {
    super(vec2(0));
    let p1 = vec2(106, 64);
    let p2 = vec2(138, 124);
    let p3 = vec2(164, 124);
    let p4 = vec2(190, 124);
    this.addChild(new Font(p1, "わーるどまっぷ", "MES"));
    const node1 = new Node(p2, 1);
    const node2 = new Node(p3, 1);
    const node3 = new Node(p4, 1);
    this.addChild(node1);
    this.addChild(node2);
    this.addChild(node3);
    const cusor = new Cusor();
    cusor.FocusOn(node1);
    this.addChild(cusor);
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
