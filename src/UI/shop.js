import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';

export default class Shop extends UI{
  constructor(){
    super(vec0());
    this.type = "SHOP";
    this.isMultiple = true;
    this.container = new PIXI.Container();
    let sprite = Art.CreateSprite(Art.UIPattern.score.icon);
    this.addSprite(sprite);
    /*基本情報*/
  }
  Update(){
  }
}
