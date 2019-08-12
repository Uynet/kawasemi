import UIManager from "./uiManager.js";

export default class UI{
  constructor(pos){
    this.frame = 0;
    this.pos = copy(pos);
    this.sprite = new PIXI.Sprite();
    this.type;//enum
    this.isUpdater = true;
    this.children = [];
  }
  Delete(){
    UIManager.removeUI(this);
  }
  SetPos(pos){
    this.pos = copy(pos);
    this.sprite.position.x = this.pos.x; 
    this.sprite.position.y = this.pos.y; 
  }
  Update(){
  }
  GetSpriteSize(){
    if(this.sprite!==undefined){
      if(this.sprite.texture!==undefined){
        return vec2(
          this.sprite.texture.width,
          this.sprite.texture.height
        )
      }
    }
    return vec2(0);
  }
  addChild(ui){
    this.sprite.addChild(ui.sprite);
    this.children.push(ui);
  }
}

