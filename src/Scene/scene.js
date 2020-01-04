import Input from "../input.js";

class KeyListenner {
  constructor(entity, keyCode, handler) {
    this.entity = entity;
    this.keyCode = keyCode;
    this.handler = handler;
  }
  Input() {
    if (Input.isKeyClick(this.keyCode)) this.handler();
  }
}

export default class Scene {
  constructor() {
    this.keyListenners = [];
  }
  addKeyListenner(entity, keyCode, handler) {
    this.keyListenners.push(new KeyListenner(entity, keyCode, handler));
  }
  Input() {
    this.keyListenners.forEach(e => e.Input());
  }
  Init() {}
  Update() {}
}
