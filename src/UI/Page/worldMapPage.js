import Font from "../font.js";
import UI from "../ui.js";
import Art from "../../art.js";
import Event from "../../Event/event.js";
import Input from "../../input.js";
import Drawer from "../../drawer.js";
import UIManager from "../uiManager.js";
import Audio from "../../audio.js";
import Game from "../../game.js";

class PoyoEvent extends Event {
  constructor(ui) {
    super(1);
    let frame = 0;
    const amp = 0.8;
    const ease = x => {
      return 1.5 + amp / (x * 50 + 1);
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
  constructor(nodeList) {
    super(vec2(0));
    this.layer = "ENTITY";
    this.nodeList = nodeList;
    this.pointer = 0;
    this.sprite = new PIXI.Sprite();
    this.sprite.scale.set(1.5);
    this.pattern = Art.bulletPattern.target;
    this.sprite.texture = this.pattern[0];
    this.focusedEntity;

    Drawer.ScrollSet(this.pos);
  }
  FocusOn(entity) {
    if (this.focusedEntity) this.focusedEntity.OnDefocus();
    this.focusedEntity = entity;
    this.pos = copy(entity.pos);
    this.pos.x += 8;
    this.pos.y += 8;
    this.SetPos(this.pos);
    this.Animate(new PoyoEvent(this));
    entity.OnFocus();
  }
  Input() {
    if (Input.isKeyPress(KEY.RIGHT)) {
      const index = this.nodeList.nodes.indexOf(this.focusedEntity);
      const len = this.nodeList.nodes.length;
      this.FocusOn(this.nodeList.nodes[clamp(index + 1, 0, len - 1)]);
    }
    if (Input.isKeyPress(KEY.LEFT)) {
      const index = this.nodeList.nodes.indexOf(this.focusedEntity);
      const len = this.nodeList.nodes.length;
      this.FocusOn(this.nodeList.nodes[clamp(index - 1, 0, len - 1)]);
    }
  }
  Update() {
    this.Input();
    this.SetPos(this.pos);
    this.ExecuteEvent();
    Drawer.ScrollOn(this.pos);
    this.frame++;
  }
}
class Node extends UI {
  constructor(pos, stageNum) {
    super(pos);
    this.layer = "ENTITY";
    this.stageNum = stageNum;

    this.sprite = Art.Sprite(Art.enemyPattern.enemy4[0]);
    this.sprite.position = pos;
    this.isActive = false;
    this.frame = 0;
  }
  OnDefocus() {
    this.isActive = false;
    this.sprite.position = this.pos;
  }
  OnFocus() {
    this.isActive = true;
    this.frame = 0;
    this.sprite.position = this.pos;
    Audio.PlaySE("landing1", 1.5, 1.5);
    Game.stage = this.stageNum;
    const stagelabel = UIManager.find("stageLabel")[0];
    stagelabel.ChangeText("すてーじ" + Game.stage, "MES");
    stagelabel.SetPos(vec2(108, 140));
  }
  Update() {
    if (this.isActive) {
      this.sprite.texture =
        Art.enemyPattern.enemy1[Math.floor(this.frame / 6) % 4];
    } else {
      this.sprite.texture = Art.enemyPattern.enemy4[0];
    }
    this.frame++;
  }
}
class NodeList extends UI {
  constructor(nodes) {
    super(vec2(0));
    this.layer = "ENTITY";
    nodes.forEach(node => this.addChild(node));
    this.nodes = nodes;
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
export default class WorldMapPage extends UI {
  constructor() {
    super(vec2(0));
    this.layer = "ENTITY";

    UIManager.add(new Font(vec2(100, 64), "わーるどまっぷ", "MES"));

    const stagelabel = new Font(vec2(108, 140), "すてーじ" + Game.stage, "MES");
    stagelabel.type = "stageLabel";
    UIManager.add(stagelabel);

    let p = vec2(106, 124);
    const nodes = [];
    for (let i = 0; i < 5; i++) {
      nodes.push(new Node(p, i + 1));
      p.x += 32;
    }
    const nodeList = new NodeList(nodes);
    this.addChild(nodeList);
    const cusor = new Cusor(nodeList);
    cusor.FocusOn(nodes[0]);
    this.addChild(cusor);
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
