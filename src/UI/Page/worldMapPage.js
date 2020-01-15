import Font from "../font.js";
import UI from "../ui.js";
import Art from "../../art.js";
import Event from "../../Event/event.js";
import Input from "../../input.js";
import Drawer from "../../drawer.js";
import UIManager from "../uiManager.js";
import Audio from "../../audio.js";
import Game from "../../game.js";
import Key from "../atoms/key.js";

class PoyoEvent extends Event {
  constructor(ui) {
    super(1);
    let frame = 0;
    const amp = 0.4;
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

class PulpulEvent extends Event {
  constructor(ui) {
    super(1);
    let frame = 0;
    const amp = 2.5;
    const ease = x => {
      return amp * Math.sin(x * 15) * Math.exp(-x * x * x * x);
    };
    const sustain = 10;
    function* gen() {
      const origPos = copy(ui.pos);
      while (frame <= sustain) {
        ui.sprite.position.x = origPos.x + ease(frame / sustain);
        frame++;
        yield;
      }
      ui.sprite.position = origPos;
      yield;
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
  // カーソルが端にある状態でさらに移動しようとしたときインタラクション
  InputDeny() {
    Audio.PlaySE("landing1", 1.5, 1.5);
    this.Animate(new PulpulEvent(this));
  }
  FocusOn(entity) {
    if (this.focusedEntity) this.focusedEntity.OnDefocus();
    Audio.PlaySE("clack2", -1.1, 0.8);
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
      const nextNode = this.nodeList.nodes[clamp(index + 1, 0, len - 1)];
      if (this.focusedEntity.stageNum <= Game.latestStage)
        this.FocusOn(nextNode);
      else this.InputDeny();
    }
    if (Input.isKeyPress(KEY.LEFT)) {
      const index = this.nodeList.nodes.indexOf(this.focusedEntity);
      const len = this.nodeList.nodes.length;
      const nextNode = this.nodeList.nodes[clamp(index - 1, 0, len - 1)];
      if (index > 0) this.FocusOn(nextNode);
      else this.InputDeny();
    }
  }
  Update() {
    const index = this.nodeList.nodes.indexOf(this.focusedEntity);

    const isCanInputRight = this.focusedEntity.stageNum <= Game.latestStage;
    const isCanInputLeft = index > 0;
    const keyRight = UIManager.find("keyRight");

    keyRight[0].sprite.alpha = isCanInputRight ? 1 : 0.5;
    const keyLeft = UIManager.find("keyLeft");
    keyLeft[0].sprite.alpha = isCanInputLeft ? 1 : 0.5;

    this.Input();
    this.SetPos(this.pos);
    this.ExecuteEvent();
    Drawer.ScrollOn(this.pos);
    this.frame++;
  }
}
class Node extends UI {
  constructor(pos, stageNum, stageName) {
    super(pos);
    this.layer = "ENTITY";
    this.stageNum = stageNum;
    this.stageName = stageName;

    const spid = this.stageNum <= Game.nextStage ? 1 : 0;
    this.sprite = Art.Sprite(Art.enemyPattern.enemy4[spid]);
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
    Game.stage = this.stageNum;
    const stagelabel = UIManager.find("stageLabel")[0];
    stagelabel.ChangeText(this.stageName, "MES");
    stagelabel.SetPos(vec2(108, 140));
  }
  Update() {
    /*
    if (this.isActive) {
      this.sprite.texture =
        Art.enemyPattern.enemy1[Math.floor(this.frame / 6) % 4];
    } else {
      this.sprite.texture = Art.enemyPattern.enemy4[0];
    }
    */
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

    //UIManager.add(new Font(vec2(100, 64), "world", "MES"));

    const stagelabel = new Font(vec2(108, 140), "stage" + Game.stage, "MES");
    stagelabel.type = "stageLabel";
    UIManager.add(stagelabel);
    const keyLeft = new Key(vec2(90, 134), "LEFT");
    keyLeft.type = "keyLeft";
    UIManager.add(keyLeft);
    const keyRight = new Key(vec2(166, 134), "RIGHT");
    keyRight.type = "keyRight";
    UIManager.add(keyRight);

    UIManager.add(new Key(vec2(190, 164), "X"));
    UIManager.add(new Font(vec2(210, 170), "けってい", "MES"));

    UIManager.add(new Key(vec2(190, 184), "Z"));
    UIManager.add(new Font(vec2(210, 190), "タイトル", "MES"));

    let p = vec2(106, 124);
    const stagelist = [101, 201, 301, 401, 404, 501];
    //クリアしてない最小のステージ番号を取得
    for (let i = 0; i < stagelist.length; i++) {
      const e = stagelist[i];
      if (e > Game.latestStage) {
        Game.nextStage = e;
        break;
      }
    }

    const stageNames = ["start", "shop", "cave1", "cave2", "cave3", "boss"];
    const nodes = [];
    for (let i = 0; i < stagelist.length; i++) {
      nodes.push(new Node(p, stagelist[i], stageNames[i]));
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
