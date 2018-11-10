import UIManager from "./uiManager.js";

export default class UI{
  constructor(pos){
    this.pos = pos;
    this.sprite;
    this.type;//enum
    this.isUpdater = true;
  }
  Delete(){
    UIManager.removeUI(this);
  }
  Update(){
  }
  addSprite(sprite){
    this.container.addChild(sprite);
  }
}

