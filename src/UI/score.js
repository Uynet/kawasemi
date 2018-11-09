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
    this.isAlive = true;//消えたらfalse
    this.type = "SCORE"; 
    this.isMultiple = true;
    this.pos = pos;
    //child
    this.icon = {pos:add(pos,POS_ICON)};
    this.value = new Font(pos,"    0","SCORE");//数字
    //スプライト
    this.container = new PIXI.Container();
    let s;
    //icon
    s = Art.SpriteFactory(Art.UIPattern.score.icon);
    s.position = this.icon.pos; 
    this.container.addChild(s);
    //value
    this.container.addChild(this.value.container);
  }
  SetScore(score){
    this.value.SetFont(score);
  }
  Update(){
    //this.value.container.position = this.pos
    this.value.Update();
    /*nothing to do*/
  }
}
