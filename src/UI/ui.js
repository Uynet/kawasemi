import UIManager from "./uiManager.js";

export default class UI{
  constructor(pos){
    this.pos = pos;
    this.sprite;
    this.type;//enum
    this.isMultiple = false;
    this.isUpdater = true;
  }
  Delete(){
    UIManager.removeUI(this);
  }
  Update(){
  }
}

