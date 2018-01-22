import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Timer from '../timer.js';
import Util from '../util.js';

const UIPt = {
  HP : 6,
  HPbar : 7,
}

export default class UIHP extends UI{
  constructor(name){
    switch (name){
      case "frame" : 
        super(Art.UIPattern[7],UI_.HP); 
        break;
      case "bar" :
        super(Art.UIPattern[8],UI_.HP); 
        break;
    }
    this.name = name;
    this.max = 10;
  }
  Bar(hp){
    this.sprite.scale.x = EntityManager.player.hp/100;
  }
}
