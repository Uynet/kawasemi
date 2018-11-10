import UI from './ui.js';
import UIManager from './uiManager.js';
import EntityManager from '../Stage/entityManager.js';
import Art from '../art.js';
import Input from '../input.js';
import Font from './font.js';

//score Icon
const POS_ICON = {
  x : 36, 
  y : -4, 
};

export default class Score extends UI{
  constructor(pos){
    super(pos);
    /*基本情報*/
    this.type = "SCORE"; 
    //child
    this.icon = {pos:add(pos,POS_ICON)};
    this.value = new Font(pos,"    0","SCORE");//数字
    //スプライト
    this.sprite = new PIXI.Container();
    let s;
    //icon
    s = Art.CreateSprite(Art.UIPattern.score.icon);
    s.position = this.icon.pos; 
    this.sprite.addChild(s);
    //value
    this.sprite.addChild(this.value.sprite);
  }
  SetScore(score){
    this.value.SetFont(score);
  }
  Update(){
    //this.value.sprite.position = this.pos
    this.value.Update();
    /*nothing to do*/
  }
}
