import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';
import Component from "./component.js";

export default class Shop extends UI{
  constructor(){
    super(vec0());
    this.type = "SHOP";
    this.isMultiple = true;
    this.sprite = new PIXI.Container();

    const style = {
      padding : vec2(16),
    }

    this.addChild(new Component(style));
  }
  Update(){
  }
}
