import Font from "../font.js";
import Param from "../../param.js";
import EntityManager from "../../Stage/entityManager.js";
import Component from "../component.js";
import UI from "../ui.js";
import Art from "../../art.js";
import Event from "../../Event/event.js";
import Input from "../../input.js";
import Drawer from "../../drawer.js";
import UIManager from "../uiManager.js";
import Audio from "../../audio.js";
import Game from "../../game.js";
import Key from "../atoms/key.js";
import ListUI from "../listUI.js";

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
  constructor(carousel, page) {
    super(vec2(0));
    this.layer = "ENTITY";
    this.carousel = carousel;
    this.page = page;
    this.pointer = 0;
    this.sprite = new PIXI.Sprite();
    this.sprite.scale.set(1.5);
    this.pattern = Art.bulletPattern.target;
    this.sprite.texture = this.pattern[0];
    this.focusedEntity;

    //Drawer.ScrollSet(this.pos);
  }
  // カーソルが端にある状態でさらに移動しようとしたときインタラクション
  InputDeny() {
    Audio.PlaySE("landing1", 1.5, 1.5);
    this.Animate(new PulpulEvent(this));
  }
  FocusOn(entity) {
    if (this.focusedEntity) this.focusedEntity.OnDefocus();
    this.page.selectedWeaponName = entity.name;
    Audio.PlaySE("clack2", -1.1, 0.8);
    this.focusedEntity = entity;
    this.pos = add(this.carousel.pos, entity.pos);
    this.pos.x += 8;
    this.pos.y += 8;
    this.SetPos(this.pos);
    this.Animate(new PoyoEvent(this));
    entity.OnFocus();
  }
  Input() {
    const index = this.carousel.nodes.indexOf(this.focusedEntity);
    const len = this.carousel.nodes.length;
    if (Input.isKeyPress(KEY.RIGHT)) {
      const nextNode = this.carousel.nodes[clamp(index + 1, 0, len - 1)];
      this.FocusOn(nextNode);
    }
    if (Input.isKeyPress(KEY.LEFT)) {
      const nextNode = this.carousel.nodes[clamp(index - 1, 0, len - 1)];
      this.FocusOn(nextNode);
    }
  }
  Update() {
    this.Input();
    this.SetPos(this.pos);
    this.ExecuteEvent();
    this.frame++;
  }
}

class Node extends UI {
  constructor(pos, name) {
    super(pos);
    this.name = name;
    this.layer = "UI";
    this.sprite = Art.Sprite(Art.UIPattern.bullet.icon[name]);
    cl(this.sprite);
    this.sprite.position = pos;
  }
  OnDefocus() {
    this.sprite.position = this.pos;
  }
  OnFocus() {
    this.sprite.position = this.pos;
  }
}

class Carousel extends UI {
  constructor(pos, nodes) {
    super(pos);
    this.layer = "ENTITY";
    nodes.forEach(node => this.addChild(node));
    this.nodes = nodes;
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}

export default class MenuPage extends UI {
  constructor() {
    super(vec2(0));
    this.type = "menuPage";
    this.layer = "UI";
    const player = EntityManager.player;

    this.selectedWeaponName = player.weapon.name;

    let wList = Object.keys(Param.player.havingWeaponList);
    wList = wList.filter(arr => {
      return Param.player.havingWeaponList[arr];
    });

    //背景
    const p1 = vec2(110 - 16, 80 - 8);
    const background = new UI(p1);
    background.sprite = Art.CreateSprite(Art.UIPattern.message.frame);
    background.sprite.position.x = p1.x;
    background.sprite.position.y = p1.y;
    this.addChild(background);

    const nodes = [];
    let p = vec2(0, 0);
    for (let i = 0; i < wList.length; i++) {
      const node = new Node(p, wList[i]);
      nodes.push(node);
      p.x += 16;
    }
    const carousel = new Carousel(vec2(110, 80), nodes);
    this.addChild(carousel);
    const cusor = new Cusor(carousel, this);

    // 現在選択中の武器のindex
    const focusedEntity = carousel.nodes.filter(
      e => e.name === this.selectedWeaponName
    )[0];
    cusor.FocusOn(focusedEntity);

    this.addChild(cusor);
  }
  Update() {
    this.children.forEach(u => u.Update());
  }
}
