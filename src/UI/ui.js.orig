import UIManager from "./uiManager.js";

export default class UI{
  constructor(pos){
    this.frame = 0;
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
  addChild(ui){
    this.sprite.addChild(ui.sprite);
  }
}

