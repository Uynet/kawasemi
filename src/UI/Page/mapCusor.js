import UI from "../../UI/ui.js";
import Game from "../../game.js";
import Art from "../../art.js";
import Event from "../../Event/event.js";
import UIManager from "../../UI/uiManager.js";
import Drawer from "../../drawer.js";
import Audio from "../../audio.js";
import Input from "../../input.js";

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

export default class MapCusor extends UI {
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
  FocusInitialize(entity) {
    this.FocusOn(entity);
    Drawer.ScrollSet(this.pos);
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